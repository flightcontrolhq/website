import hljs from 'highlight.js'
import { forwardRef } from 'react'

type Props = {
  className?: string
  language?: 'js' | 'ts' | 'tsx' | 'json'
  code?: string
  maxHeight?: number
}

export const Code = forwardRef(function Code({ language, className, maxHeight, code = '' }: Props) {
  let highlighted = hljs.highlightAuto(code)
  try {
    if (language) {
      highlighted = hljs.highlight(language, code)
    }
  } catch {}
  return (
    <pre
      className={`hljs w-full h-full overflow-auto flex p-5 text-sm leading-normal bg-darkGray ${className}`}
    >
      <code
        className="w-full h-full font-mono"
        dangerouslySetInnerHTML={{ __html: highlighted.value }}
        style={{
          maxHeight,
          overflowY: maxHeight ? 'auto' : 'unset',
        }}
      />
    </pre>
  )
})
