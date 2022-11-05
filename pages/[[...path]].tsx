import {
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
  getStaticProps as makeswiftGetStaticProps,
} from '@makeswift/runtime/next'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BlogContext, BlogSummaryContext } from 'lib/blog-context'
import { getConfig } from 'lib/config'
import { BLOG_BY_SLUG_QUERY, BLOG_SUMMARIES_QUERY, usePreviewSubscription } from 'lib/sanity'
import { getClient } from 'lib/sanity/sanity.server'
import { BlogPost, BlogPostSummaries } from 'lib/sanity/types'

import '../lib/makeswift/register-components'
import { useSession } from '../src/blitz-client'

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ path: string[] }, { makeswift: boolean }>,
): Promise<GetStaticPropsResult<PageProps>> {
  const config = getConfig()
  const makeswiftResult = await makeswiftGetStaticProps(ctx)

  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)
  const blogPost = await getClient().fetch<BlogPost>(BLOG_BY_SLUG_QUERY, {
    slug: config.sanity.blogTemplateSlug,
  })

  return {
    ...makeswiftResult,
    // @ts-ignore
    props: { blogPostSummaries, blogPost, ...makeswiftResult.props },
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

  const { pathname } = useRouter()
  const session = useSession()

  useEffect(() => {
    if (pathname === '/' && !session.isLoading && session.userId) {
      window.location.href = 'https://app.flightcontrol.dev'
    }
  }, [pathname, session])

  return (
    <BlogSummaryContext.Provider value={previewBlogPostSummaries}>
      <BlogContext.Provider value={previewBlogPost}>
        <MakeswiftPage {...props} />
      </BlogContext.Provider>
    </BlogSummaryContext.Provider>
  )
}
export { getStaticPaths } from '@makeswift/runtime/next'
