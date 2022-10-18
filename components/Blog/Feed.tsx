import classNames from 'classnames'
import { forwardRef, Ref, useState } from 'react'

import { Button } from 'components/Button'
import { useBlogSummaries } from 'lib/blog-context'

import { Card } from './Card'

type Props = { className?: string; count?: number }

export const Feed = forwardRef(function BlogFeed(
  { className, count, ...props }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const blogSummaries = useBlogSummaries()

  const [isShowingMore, setShowMore] = useState(false)

  return (
    <div
      className={classNames(className, 'space-y-7.5 flex flex-col justify-center items-center')}
      ref={ref}
      {...props}
    >
      {blogSummaries
        .slice(0, isShowingMore ? blogSummaries.length : count ?? 0)
        .map(blogSummary => (
          <Card blogSummary={blogSummary} key={blogSummary._id} />
        ))}
      {!isShowingMore && blogSummaries.length > (count ?? 0) && (
        <Button variant="outlined" showArrows={false} onClick={() => setShowMore(true)}>
          Show more
        </Button>
      )}
    </div>
  )
})
