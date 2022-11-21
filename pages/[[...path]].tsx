import {
  Makeswift,
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
} from '@makeswift/runtime/next'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BlogContext, BlogSummaryContext } from 'lib/blog-context'
import { getConfig } from 'lib/config'
import { BLOG_BY_SLUG_QUERY, BLOG_SUMMARIES_QUERY, usePreviewSubscription } from 'lib/sanity'
import { getClient } from 'lib/sanity/sanity.server'
import { BlogPost, BlogPostSummaries } from 'lib/sanity/types'

import '../lib/makeswift/register-components'
import { useSession } from '../src/blitz-client'

export async function getStaticPaths() {
  const config = getConfig()
  const makeswift = new Makeswift(config.makeswift.siteApiKey)
  const pages = await makeswift.getPages()

  return {
    paths: pages.map(page => ({
      params: { path: page.path.split('/').filter(segment => segment !== '') },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({
  params,
  previewData,
  preview,
}: GetStaticPropsContext<{ path: string[] }, { makeswift: boolean }>) {
  const config = getConfig()
  const makeswift = new Makeswift(config.makeswift.siteApiKey)
  const path = '/' + (params?.path ?? []).join('/')
  const snapshot = await makeswift.getPageSnapshot(path, {
    preview: previewData?.makeswift == true,
  })

  const blogPostSummaries = await getClient().fetch<BlogPostSummaries>(BLOG_SUMMARIES_QUERY)
  const blogPost = await getClient().fetch<BlogPost>(BLOG_BY_SLUG_QUERY, {
    slug: config.sanity.blogTemplateSlug,
  })
  if (blogPost == null) {
    console.error(
      `"config.sanity.blogTemplateSlug" must be a published sanity blog-post.slug. It\'s current value is ${config.sanity.blogTemplateSlug}`,
    )
    if ('/' + (params?.path ?? []).join('/') === config.makeswift.blogTemplatePathname) {
      throw new Error(
        `"config.sanity.blogTemplateSlug" must be a published sanity blog-post.slug. It\'s current value is ${config.sanity.blogTemplateSlug}. Make sure there is a published Sanity blog-post for this`,
      )
    }
  }

  if (snapshot == null) return { notFound: true }

  return {
    props: {
      preview: preview ?? false,
      previewData: previewData?.makeswift == true,
      snapshot,
      blogPostSummaries,
      blogPost,
    },
  }
}

type PageProps = {
  blogPostSummaries: BlogPostSummaries
  blogPost: BlogPost
  preview: boolean
  previewData: boolean
} & MakeswiftPageProps

export default function Page({
  snapshot,
  preview,
  previewData,
  blogPostSummaries,
  blogPost,
}: PageProps) {
  console.log({
    route: 'catchall',
    preview,
    previewData,
  })
  const { data: previewBlogPostSummaries } = usePreviewSubscription<BlogPostSummaries>(
    BLOG_SUMMARIES_QUERY,
    {
      initialData: blogPostSummaries,
      enabled: preview,
    },
  )

  const { data: previewBlogPost } = usePreviewSubscription<BlogPost>(BLOG_BY_SLUG_QUERY, {
    params: { slug: blogPost?.slug },
    initialData: blogPost,
    enabled: preview,
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
        <MakeswiftPage snapshot={snapshot} />
      </BlogContext.Provider>
    </BlogSummaryContext.Provider>
  )
}
