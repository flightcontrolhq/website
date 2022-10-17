import dayjs from 'dayjs'
import { createContext, useContext } from 'react'

import { BlogPost, BlogPostSummaries, DEFAULT_BLOG, DEFAULT_BLOG_SUMMARIES } from './sanity'

export const BlogSummaryContext = createContext<BlogPostSummaries>(DEFAULT_BLOG_SUMMARIES)

export function useBlogSummaries() {
  const blogSummaries = useContext(BlogSummaryContext)

  return blogSummaries
    .filter(blogSummary => dayjs(blogSummary.publishedAt).isBefore(dayjs()))
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
}

export const BlogContext = createContext<BlogPost>(DEFAULT_BLOG)

export function useBlog() {
  return useContext(BlogContext)
}
