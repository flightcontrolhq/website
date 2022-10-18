import invariant from 'tiny-invariant'

export type PublicConfig = {
  sanity: {
    dataset: string
    projectId: string
    // the slug set in Sanity of the blog content used for the template
    blogTemplateSlug: string
  }
}

export type Config = {
  makeswift: {
    siteApiKey: string
    // the pathname set in Makeswift of the blog layout
    blogTemplatePathname: string
  }
} & PublicConfig

/*
 * These are split because in FE code I don't want my config to throw when non-`NEXT_PUBLIC_` variables are checked.
 */
export function getPublicConfig(): PublicConfig {
  invariant(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'NEXT_PUBLIC_SANITY_DATASET env var is not defined.',
  )
  invariant(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'NEXT_PUBLIC_SANITY_PROJECT_ID env var is not defined.',
  )
  return {
    sanity: {
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      blogTemplateSlug: 'next-js-preview-mode',
    },
  }
}

export function getConfig(): Config {
  invariant(process.env.MAKESWIFT_SITE_API_KEY, 'MAKESWIFT_SITE_API_KEY env var is not defined.')
  return {
    ...getPublicConfig(),
    makeswift: {
      siteApiKey: process.env.MAKESWIFT_SITE_API_KEY,
      blogTemplatePathname: '/__blog__',
    },
  }
}
