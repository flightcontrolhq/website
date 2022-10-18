import createImageUrlBuilder from '@sanity/image-url'
import { createPreviewSubscriptionHook, createCurrentUserHook } from 'next-sanity'

import { config } from './config'

export const urlFor = source => {
  try {
    return createImageUrlBuilder(config).image(source).auto('format').fit('max').url()
  } catch (e) {
    console.error(
      `urlFor was called with ${source} of type ${typeof source}, but requires a source of type SanityImageObject`,
      e,
    )
    return ''
  }
}

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const useCurrentUser = createCurrentUserHook(config)
