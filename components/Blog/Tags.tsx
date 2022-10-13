import { useBlog } from 'lib/blog-context'
import { BlogTag } from 'lib/sanity'

type Props = {
  className?: string
  tags?: Partial<BlogTag>[]
}

export function Tags({ tags, className, ...props }: Props) {
  return (
    <div {...props} className={`${className} flex space-x-2`}>
      {tags?.map(tag => (
        <div
          key={tag.title ?? ''}
          className={`bg-green/20 uppercase text-[12px] leading-[19px] font-bold px-2 pt-1.5 pb-1 text-green`}
        >
          {tag?.title ?? 'Untitled'}
        </div>
      )) ?? null}
    </div>
  )
}

export function BlogTags({ className }: Pick<Props, 'className'>) {
  const { tags } = useBlog()
  return <Tags tags={tags} className={className} />
}
