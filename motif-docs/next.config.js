import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { createLoader } from 'simple-functional-loader'

const buildTree = (dir, parentName = 'pages') => {
  const result = {}
  const list = fs.readdirSync(dir)
  result.name = parentName
  for (const item of list) {
    if (item.startsWith('_app.')) {
      continue
    }
    const itemPath = path.join(dir, item)
    const stats = fs.statSync(itemPath)
    if (stats.isDirectory()) {
      result.folders = [...(result.folders || []), buildTree(itemPath, item)]
    } else {
      const frontmatter = matter(fs.readFileSync(itemPath, { encoding: 'utf-8' }))
      const p = path
        .join(path.dirname(itemPath), path.basename(itemPath, path.extname(itemPath)))
        .replace(/^pages/, '')
        .replace(/\/index$/, '')

      result.files = [
        ...(result.files || []),
        {
          name: item,
          path: p,
          meta: frontmatter.data,
        },
      ]
    }
  }
  return result
}

const config = {
  basePath: '/docs',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        basePath: false,
        permanent: false,
      },
    ]
  },
  images: {
    domains: ['*.motif.land', 'res.cloudinary.com'],
  },
  experimental: {
    urlImports: ['https://cdn.skypack.dev/', 'https://cdn.motif.land/'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  resolve: {
    extensions: ['.mdx', '.md', '...'],
  },
  webpack(config, options) {
    const files = buildTree('./pages')

    config.module.rules.push({
      test: { and: [/\.mdx$/] },
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          // If source already had an explicitly defined `meta`
          // (caught and transformed into `__motif_meta__` in the
          // previous loader), this will take precedence, and
          // the one extracted from the frontmatter will be ignored.
          if (/export\s+(const|let|var)\s+__motif_meta__\s*=/.test(source)) {
            source = source
              .replace(/export\s+(const|let|var)\s+meta\s*=/, 'export $1 __motif_frontmatter__ =')
              .replace(
                /export\s+(const|let|var)\s+__motif_meta__\s*=\s*{/,
                'export $1 meta = {\n  ...__motif_frontmatter__,',
              )
          }

          const pathSegments = this.resourcePath.split(path.sep)
          const filename = pathSegments.slice(-1)[0]

          return `${source}
MDXContent.meta=meta
MDXContent.filename="${filename}"
MDXContent.files=${JSON.stringify(files)}`
        }),
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [
              remarkMath,
              remarkGfm,
              remarkFrontmatter,
              [remarkMdxFrontmatter, { name: 'meta' }],
            ],
            rehypePlugins: [],
          },
        },
        createLoader(function (source) {
          return source.replace(/export\s+(const|let|var)\s+meta\s*=/, 'export $1 __motif_meta__ =')
        }),
      ],
    })

    config.module.rules.push({
      test: { and: [/\.mdoc$/] },
      use: [
        // Adding the babel loader enables fast refresh
        options.defaultLoaders.babel,
        createLoader(function (source) {
          const mode = 'static'
          const dataFetchingFunction = mode === 'server' ? 'getServerSideProps' : 'getStaticProps'

          return `import React from 'react';
import yaml from 'js-yaml';
import Markdoc, { renderers } from '@markdoc/markdoc'
import markdocConfig from "/markdoc.config"
import markdocComponents from "/markdoc.components"

const source = ${JSON.stringify(source)};
const ast = Markdoc.parse(source);
const frontmatter = ast.attributes.frontmatter
  ? yaml.load(ast.attributes.frontmatter)
  : {};

export async function ${dataFetchingFunction}(context) {
  const cfg = {
    ...markdocConfig,
    variables: {
      ...(markdocComponents ? markdocComponents.variables : {}),
      frontmatter,
      markdoc: { frontmatter },
    },
    source,
  };

  const content = await Markdoc.transform(ast, cfg);

  return {
    props: JSON.parse(
      JSON.stringify({
        markdoc: {
          content,
          frontmatter,
        },
      })
    ),
  };
}

export default function MarkdocComponent(props) {
  return renderers.react(props.markdoc.content, React, {
    components: {
      ...markdocComponents,
      ...props.components,
    },
  });
}
`
        }),
      ],
    })

    return config
  },
}

export default config
