import Image from 'next/future/image'

import { BlogAuthor, urlFor } from 'lib/sanity'
import { useBlog } from 'lib/blog-context'

type Props = {
  className?: string
  author?: Partial<BlogAuthor>
}

export function Author({ author, className, ...props }: Props) {
  return (
    <div {...props} className={`${className} flex space-x-3 justify-start items-center`}>
      <Image
        width={44}
        height={44}
        className="rounded-full"
        alt={author?.name ?? 'Unnamed'}
        src={author?.image ? urlFor(author.image) : ''}
      />
      <span className="text-white text-small capitalize">{author?.name ?? 'Unnamed'}</span>
    </div>
  )
}

export function BlogAuthor({className}:Pick<Props, 'className'>) {
  const { author } = useBlog()
  return <Author author={author} className={className}/>
}
