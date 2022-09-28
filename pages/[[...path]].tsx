import { Makeswift, MakeswiftPageSnapshot, Page as MakeswiftPage } from '@makeswift/runtime/next'
import { GetStaticPropsContext } from 'next'

import { getConfig } from 'lib/config'

import '../lib/makeswift/register-components'

export async function getStaticPaths() {
  const config = getConfig()
  const makeswift = new Makeswift(config.makeswiftSiteApiKey)
  const pages = await makeswift.getPages()

  return {
    paths: pages.map(page => ({
      params: {
        path: page.path.split('/').filter(segment => segment !== ''),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const config = getConfig()
  const makeswift = new Makeswift(config.makeswiftSiteApiKey)
  const path = ctx.params?.path ?? []
  const pathString = typeof path === 'string' ? `/${path}` : `/${path.join('/')}`
  const snapshot = await makeswift.getPageSnapshot(pathString, {
    preview: ctx.preview,
  })

  if (snapshot == null) return { notFound: true }

  return { props: { snapshot } }
}

export default function Page({ snapshot }: { snapshot: MakeswiftPageSnapshot }) {
  return <MakeswiftPage snapshot={snapshot} />
}
