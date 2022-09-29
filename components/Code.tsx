import classNames from 'classnames'
import hljs from 'highlight.js'
import { forwardRef } from 'react'

type Props = {
  className?: string
  language?: 'js' | 'ts' | 'tsx' | 'json'
  code?: string
}

export const Code = forwardRef(function Code({ language, className, code = '' }: Props) {
  const highlighted = language ? hljs.highlight(language, code) : hljs.highlightAuto(code)
  return (
    <pre className={`hljs w-full h-full overflow-auto flex p-5 ${className}`}>
      <code
        className="w-full h-full font-mono text-sm leading-normal"
        dangerouslySetInnerHTML={{ __html: highlighted.value }}
      />
    </pre>
  )
})
