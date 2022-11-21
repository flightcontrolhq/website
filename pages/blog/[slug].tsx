import {
  Makeswift,
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
} from '@makeswift/runtime/next'
import dayjs from 'dayjs'
import { GetStaticPropsContext } from 'next'

import { BlogContext, BlogSummaryContext } from 'lib/blog-context'
import { getConfig } from 'lib/config'
import { BLOG_BY_SLUG_QUERY, BLOG_SUMMARIES_QUERY } from 'lib/sanity'
import { usePreviewSubscription } from 'lib/sanity/sanity'
import { getClient } from 'lib/sanity/sanity.server'
import { BlogPost, BlogPostSummaries } from 'lib/sanity/types'

import '../../lib/makeswift/register-components'

export async function getStaticPaths() {
  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)

  return {
    paths: blogPostSummaries
      .filter(blogSummary => {
        dayjs(blogSummary.publishedAt).isBefore(dayjs())
      })
      .map(blogSummary => ({ params: { slug: blogSummary.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({
  params,
  previewData,
  preview,
}: GetStaticPropsContext<{ slug: string }, { makeswift: boolean }>) {
  const config = getConfig()

  const makeswift = new Makeswift(config.makeswift.siteApiKey)
  const snapshot = await makeswift.getPageSnapshot(config.makeswift.blogTemplatePathname, {
    preview: previewData?.makeswift == true,
  })

  if (snapshot == null) return { notFound: true }

  const slug = params?.slug

  if (slug == null) throw new Error('"slug" URL parameter must be defined.')
  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)
  const blogPost = await getClient().fetch<BlogPost>(BLOG_BY_SLUG_QUERY, { slug })
  if (blogPost == null) return { notFound: true }

  console.log({
    preview,
    previewData,
  })
  return {
    props: {
      snapshot,
      blogPostSummaries,
      blogPost,
      preview,
      previewData,
    },
    revalidate: 1,
  }
}

type PageProps = {
  blogPostSummaries: BlogPostSummaries
  blogPost: BlogPost
  preview: boolean
  previewData: { makeswift: boolean }
} & MakeswiftPageProps

export default function Page({
  snapshot,
  preview,
  previewData,
  blogPostSummaries,
  blogPost,
}: PageProps) {
  console.log({
    route: 'dynamic blog route',
    preview,
    previewData,
  })
  const { data: previewBlogPostSummaries } = usePreviewSubscription<BlogPostSummaries>(
    BLOG_SUMMARIES_QUERY,
    {
      initialData: blogPostSummaries,
      enabled: previewData.makeswift == true,
    },
  )
  const { data: previewBlogPost } = usePreviewSubscription<BlogPost>(BLOG_BY_SLUG_QUERY, {
    params: { slug: blogPost?.slug },
    enabled: previewData.makeswift == true,
    initialData: blogPost,
  })

  return (
    <BlogSummaryContext.Provider value={previewBlogPostSummaries}>
      <BlogContext.Provider value={previewBlogPost}>
        <MakeswiftPage snapshot={snapshot} />
      </BlogContext.Provider>
    </BlogSummaryContext.Provider>
  )
}
