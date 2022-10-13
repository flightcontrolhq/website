import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type BlogTag = {
  title: string
  description: string
}

export type BlogAuthor = {
  name: string
  image: SanityImageObject
}

export type BlogPostSummary = {
  _id: string
  title?: string
  tags?: Partial<BlogTag>[]
  author?: Partial<BlogAuthor>
  slug?: string
  publishedAt?: string
}

export type BlogPostSummaries = BlogPostSummary[]

export type BlogPost = {
  content: any
} & BlogPostSummary

export type BlogPosts = BlogPost[]
