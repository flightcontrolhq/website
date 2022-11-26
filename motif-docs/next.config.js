import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import {remarkSluggifyHeadingId} from './remark-sluggyify-heading-id.js'
import { createLoader } from 'simple-functional-loader'
import algoliasearch from 'algoliasearch';
import {remark} from 'remark'
import mdx from 'remark-mdx'
import strip from 'strip-markdown'
import stripMdx from './mdx-to-plain.js'

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

      const plain = remark().use(mdx).use(stripMdx).use(strip).processSync(frontmatter.content)

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
          content: plain.value
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


    /* Indexing Algolia */
    const getDescription = file => {
      return (
        file.meta?.description || file.meta?.meta?.description || file.meta?.meta?.['og:description']
      )
    }
    
    const getTitle = file => {
      return file.meta?.title || file.meta?.meta?.title || (file.name && removeFileExtension(file.name))
    }

    const filesToSearchData = (folder, parentFolderNames, rootName = 'Home') => {
      const isRoot = !parentFolderNames
      const folders = [...(parentFolderNames || []), isRoot ? rootName : folder.name]
      let data = folder.files?.map(f => {
        return (
          {
            path: f.path,
            title: getTitle(f),
            description: getDescription(f),
            folders: folders,
            content: f.content
          }
        )
      })
      if (!data) {
        return []
      }
      for (const f of folder.folders || []) {
        data = data.concat(filesToSearchData(f, folders, rootName))
      }
      return data
    }

    const searchData = () => {
      return filesToSearchData(files, undefined, "Home")
    }

    const client = algoliasearch('VTSKZ0Z9CR', process.env.ALGOLIA_WRITE_KEY);
    const index = client.initIndex('fc-docs');


    const transformed = searchData().filter(article => article.title !== "Flightcontrol Docs").map(article => {
      return article.content.split(/\r?\n/).filter(e => e).map((e, i) => ({
        objectID: `${article.path}-${i}`,
        title: article.title,
        slug: article.path,
        section: i,
        content: e
      }))
      // return {
      //   objectID: article.path,
      //   title: article.title,
      //   description: article.description,
      //   slug: article.path,
      //   type: 'article',
      //   // content: article.content
      // };
    });

    const arrayTransformed = transformed.filter(e => e.length).flatMap(f => {
      return f
    })

    index.setSettings({
      attributeForDistinct: 'section',
      distinct: true
    })

    index.saveObjects(arrayTransformed, { autoGenerateObjectIDIfNotExist: true });

    /* End Indexing Algolia */

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
              remarkSluggifyHeadingId,
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
