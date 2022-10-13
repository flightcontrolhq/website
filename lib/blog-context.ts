import { createContext, useContext } from 'react'

import { BlogPost, BlogPostSummaries, DEFAULT_BLOG, DEFAULT_BLOG_SUMMARIES } from './sanity'

export const BlogSummaryContext = createContext<BlogPostSummaries>(DEFAULT_BLOG_SUMMARIES)

export function useBlogSummaries() {
  return useContext(BlogSummaryContext)
}

export const BlogContext = createContext<BlogPost>(DEFAULT_BLOG)

export function useBlog() {
  return useContext(BlogContext)
}
