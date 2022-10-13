import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import { Corners } from 'components'

import { Code } from 'components/Code'
import { useBlog } from 'lib/blog-context'
import { BlogAuthor } from 'lib/sanity'

type Props = {
  className?: string
  author?: Partial<BlogAuthor>
}

export function BlogContent({ className }: Pick<Props, 'className'>) {
  const { content } = useBlog()
  return (
    <div className={classNames(className, 'prose prose-invert')}>
      <PortableText
        value={content}
        components={{
          types: {
            code: props => {
              return (
                <div className="not-prose prose-zinc relative z-0 border border-midGray bg-darkGray">
                  <Corners />
                  <Code language={props.value.language} code={props.value.code} />
                </div>
              )
            },
          },
        }}
      />
    </div>
  )
}
