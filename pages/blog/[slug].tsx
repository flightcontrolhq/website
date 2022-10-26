import {
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
  getStaticProps as makeswiftGetStaticProps,
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

export async function getStaticProps(ctx: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig()
  const makeswiftResult = await makeswiftGetStaticProps({
    ...ctx,
    params: {
      ...ctx.params,
      path: config.makeswift.blogTemplatePathname.replace(/^\//, '').split('/'),
    },
  })
  if (!('props' in makeswiftResult)) return makeswiftResult
  const slug = ctx.params?.slug

  if (slug == null) throw new Error('"slug" URL parameter must be defined.')
  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)
  const blogPost = await getClient().fetch<BlogPost>(BLOG_BY_SLUG_QUERY, { slug })
  if (blogPost == null) return { notFound: true }

  return {
    ...makeswiftResult,
    props: {
      blogPostSummaries,
      blogPost,
      ...makeswiftResult.props,
    },
    revalidate: 1,
  }
}

type PageProps = {
  blogPostSummaries: BlogPostSummaries
  blogPost: BlogPost
  preview: boolean
} & MakeswiftPageProps

export default function Page({ blogPostSummaries, blogPost, ...props }: PageProps) {
  const { data: previewBlogPostSummaries } = usePreviewSubscription<BlogPostSummaries>(
    BLOG_SUMMARIES_QUERY,
    {
      initialData: blogPostSummaries,
      enabled: false,
    },
  )
  const { data: previewBlogPost } = usePreviewSubscription<BlogPost>(BLOG_BY_SLUG_QUERY, {
    params: { slug: blogPost?.slug },
    initialData: blogPost,
    enabled: false,
  })

  return (
    <BlogSummaryContext.Provider value={previewBlogPostSummaries}>
      <BlogContext.Provider value={previewBlogPost}>
        <MakeswiftPage {...props} />
      </BlogContext.Provider>
    </BlogSummaryContext.Provider>
  )
}
