import slugify from '@sindresorhus/slugify'
import { hasProperty } from 'hast-util-has-property'
import { visit } from 'unist-util-visit'

const mdxJsxFlowElementHasId = (node) => {
  return !!node.attributes.find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === 'id'
  )
}

const generateUniqueSlug = (name, slugs) => {
  let slug = slugify(name)
  let slugIndex = 1
  while (slugs.indexOf(slug) > -1) {
    slug = `${slugify(name)}-${slugIndex}`
    slugIndex++
  }
  return slug
}

export const getTextValue = (node) => {
  return (node.children || [])
    .filter((c) => c.type === 'text')
    .map((c) => c.value)
    .join(' ')
}

export function remarkSluggifyHeadingId() {
  return function (tree) {
    const slugs = []

    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (
        node.name === 'h1' ||
        node.name === 'h2' ||
        node.name === 'h3' ||
        node.name === 'h4' ||
        node.name === 'h5' ||
        node.name === 'h6'
      ) {
        if (!mdxJsxFlowElementHasId(node)) {
          const slug = generateUniqueSlug(getTextValue(node), slugs)
          slugs.push(slug)
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'id',
            value: slug,
          })
        }
      }
    })

    visit(tree, 'heading', (node) => {
      if (
        node.depth === 1 ||
        node.depth === 2 ||
        node.depth === 3 ||
        node.depth === 4 ||
        node.depth === 5 ||
        node.depth === 6
      ) {
        if (hasProperty(node, 'id')) {
          return
        }

        const text = getTextValue(node)

        if (!node.data) {
          node.data = {}
        }

        if (!node.data.hProperties) {
          node.data.hProperties = {}
        }

        const slug = generateUniqueSlug(text, slugs)
        slugs.push(slug)

        node.data.id = slug
        node.data.hProperties.id = slug
      }
    })
  }
}