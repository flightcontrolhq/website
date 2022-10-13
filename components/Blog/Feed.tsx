import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, Ref } from 'react'

import { useBlogSummaries } from 'lib/blog-context'

import { Card } from './Card'

type Props = { className?: string }

export const Feed = forwardRef(function BlogFeed(
  { className, ...props }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const blogSummaries = useBlogSummaries()

  return (
    <div className={classNames(className, 'space-y-7.5')} ref={ref} {...props}>
      {blogSummaries
        .sort((firstBlogSummary, secondBlogSummary) => {
          const firstDate = dayjs(firstBlogSummary.publishedAt)
          const secondDate = dayjs(secondBlogSummary.publishedAt)
          if (firstDate.isAfter(secondDate)) {
            return -1
          } else if (firstDate.isBefore(secondDate)) {
            return 1
          } else {
            return 0
          }
        })
        .map(blogSummary => (
          <Card blogSummary={blogSummary} key={blogSummary._id} />
        ))}
    </div>
  )
})
