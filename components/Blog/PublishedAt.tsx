import dayjs from 'dayjs'

import { useBlog } from 'lib/blog-context'

type Props = {
  className?: string
  date?: string
}

export function PublishedAt({ date, className, ...props }: Props) {
  return (
    <p {...props} className={`${className} text-lightGray text-medium`}>
      {date ? dayjs(date).format('MMMM D, YYYY') : 'Undated'}
    </p>
  )
}

export function BlogPublishedAt({ className }: Pick<Props, 'className'>) {
  const { publishedAt } = useBlog()

  return <PublishedAt date={publishedAt} className={className} />
}
