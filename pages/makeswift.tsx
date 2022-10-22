import {
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
  getServerSideProps as makeswiftGetServerSideProps,
} from '@makeswift/runtime/next'
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next'

import { BlogContext, BlogSummaryContext } from 'lib/blog-context'
import { getConfig } from 'lib/config'
import { BLOG_BY_SLUG_QUERY, BLOG_SUMMARIES_QUERY, usePreviewSubscription } from 'lib/sanity'
import { getClient } from 'lib/sanity/sanity.server'
import { BlogPost, BlogPostSummaries } from 'lib/sanity/types'

import '../lib/makeswift/register-components'

export async function getServerSideProps(
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PageProps>> {
  const makeswiftResult = await makeswiftGetServerSideProps(ctx)
  if (!('props' in makeswiftResult)) return makeswiftResult
  const config = getConfig()
  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)
  const blogPost = await getClient().fetch<BlogPost>(BLOG_BY_SLUG_QUERY, {
    slug: config.sanity.blogTemplateSlug,
  })

  return {
    ...makeswiftResult,
    // @ts-ignore: `GetServerSidePropsResult['props']` is wrapped in a promise for some reason.
    props: { ...makeswiftResult.props, blogPost, blogPostSummaries },
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
      enabled: true,
    },
  )

  const { data: previewBlogPost } = usePreviewSubscription<BlogPost>(BLOG_BY_SLUG_QUERY, {
    params: { slug: blogPost?.slug },
    initialData: blogPost,
    enabled: true,
  })

  return (
    <BlogSummaryContext.Provider value={previewBlogPostSummaries}>
      <BlogContext.Provider value={previewBlogPost}>
        <MakeswiftPage {...props} />
      </BlogContext.Provider>
    </BlogSummaryContext.Provider>
  )
}
