import {
  Makeswift,
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
} from '@makeswift/runtime/next'
import { GetStaticPropsContext } from 'next'

import { getConfig } from 'lib/config'

import '../lib/makeswift/register-components'

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

export async function getStaticProps(ctx: GetStaticPropsContext<{ path: string[] }>) {
  const config = getConfig()
  const makeswift = new Makeswift(config.makeswift.siteApiKey)
  const path = '/' + (ctx.params?.path ?? []).join('/')
  const snapshot = await makeswift.getPageSnapshot(path, { preview: ctx.preview })

  if (snapshot == null) return { notFound: true }

  return { props: { snapshot } }
}

export default function Page({ snapshot }: MakeswiftPageProps) {
  return <MakeswiftPage snapshot={snapshot} />
}
