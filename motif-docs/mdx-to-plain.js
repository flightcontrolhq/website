const DEFAULT_EMPTY_LIST = [
  'code',
  'horizontalRule',
  'thematicBreak',
  'html',
  'table',
  'tableCell',
  'definition',
  'yaml',
  'toml',
  'jsx',
  'import',
  'export',
  'mdxjsEsm',
  'mdxJsxFlowElement',
  'mdxJsxTextElement'
]

/* Return an stringified image. */
function image(token) {
  return {type: 'text', value: token.alt || token.title || ''}
}

/* Return `token`s value. */
function text(token) {
  return {type: 'text', value: token.value}
}

/* Return a paragraph. */
function paragraph(token) {
  return {type: 'paragraph', children: token.children}
}

/* Return the concatenation of `token`s children. */
function children(token) {
  return token.children
}

/* Return line break. */
function lineBreak() {
  return {type: 'text', value: '\n'}
}

/* Return nothing. */
function empty() {
  return {type: 'text', value: ''}
}

class MDXStrip {
  constructor({emptyList = DEFAULT_EMPTY_LIST}) {
    this.map = {}

    this.map.heading = paragraph
    this.map.text = text
    this.map.inlineCode = text
    this.map.image = image
    this.map.imageReference = image
    this.map.break = lineBreak

    this.map.blockquote = children
    this.map.list = children
    this.map.listItem = children
    this.map.strong = children
    this.map.emphasis = children
    this.map.delete = children
    this.map.link = children
    this.map.linkReference = children

    emptyList.forEach(key => {
      this.map[key] = empty
    })

    this.one = this.one.bind(this)
    this.clean = this.clean.bind(this)
    this.all = this.all.bind(this)
  }

  /* One node. */
  one(node) {
    let type = node && node.type

    if (type in this.map) {
      node = this.map[type](node)
    }

    if ('length' in node) {
      node = this.all(node)
    }

    if (node.children) {
      node.children = this.all(node.children)
    }

    return node
  }

  /* Multiple nodes. */
  all(nodes) {
    let index = -1
    let length = nodes.length
    let result = []
    let value

    while (++index < length) {
      value = this.one(nodes[index])
      
      if (value && typeof value.length === 'number') {
        result = result.concat(value.map(this.one))
      } else {
        result.push(value)
      }
    }


    return this.clean(result)
  }

  /* Clean nodes: merges text's. */
  clean(values) {
    let index = -1
    let length = values.length
    let result = []
    let prev = null
    let value

    while (++index < length) {
      value = values[index]

      if (prev && 'value' in value && value.type === prev.type) {
        prev.value += value.value
      } else {
        result.push(value)
        prev = value
      }
    }

    return result
  }
}

function strip(emptyList = DEFAULT_EMPTY_LIST) {
  const mdxStrip = new MDXStrip({emptyList})
  return mdxStrip.one
}

export default strip

