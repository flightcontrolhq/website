import { MDXProvider } from '@mdx-js/react'
import fastLevenshtein from 'fast-levenshtein'
import minimatch from 'minimatch'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import motifConfig from '../motif.json'
import '/styles/main.css'

export const getBestGlobMatch = (globs: string[], path: string): string | undefined => {
  const match = globs
    .filter(p => minimatch(path, p))
    .sort((m1, m2) => {
      const d1 = fastLevenshtein.get(m1, path)
      const d2 = fastLevenshtein.get(m2, path)
      return d1 < d2 ? -1 : 1
    })?.[0]

  if (match === undefined && globs.includes('**/*')) {
    return '**/*'
  }
  return match
}

const getTemplateId = (pathname: string) => {
  const templateMappings = (motifConfig.templates as { [k: string]: string }) || {}
  const path = pathname === '/' ? '' : pathname?.replace(/^\//, '')
  const matchingGlob = getBestGlobMatch(Object.keys(templateMappings), path)
  if (matchingGlob && matchingGlob in templateMappings) {
    return templateMappings[matchingGlob]
  }
}

const getTemplate = (pathname: string) => {
  switch (getTemplateId(pathname)) {
    case 'documentation':
      return dynamic(() =>
        import('@templates/documentation.mdx').then(mod => (mod as any).Template),
      )
    case 'http-api':
      return dynamic(() => import('@templates/http-api.mdx').then(mod => (mod as any).Template))
    case 'base':
      return dynamic(() => import('@templates/base.mdx').then(mod => (mod as any).Template))
    default:
      return dynamic(() => import('@templates/plain.mdx').then(mod => (mod as any).Template))
  }
}

export type Size = {
  width: number
  height: number
}

// This function looks at the img src and extracts size dimenstions
// from it. For context, when uploading an image via Motif, we
// compute its dimensions and add it to the file upload URL. This
// info is required for using e.g. next/image.
export const imageUrlToDimensions = (src: string): Size | undefined => {
  const filename = src?.split('/')[src?.split('/').length - 1]
  let sizeInfo: string | string[] = filename?.split('-')[0]
  let size: Size | undefined = undefined

  if (sizeInfo?.startsWith('i')) {
    sizeInfo = sizeInfo.slice(1)
    sizeInfo = sizeInfo.split('x')
    if (sizeInfo.every(n => !isNaN(Number(n)))) {
      size = {
        width: Number(sizeInfo[0]),
        height: Number(sizeInfo[1]),
      }
    }
  }

  return size
}

const components = {
  a: ({ href, ...props }: { href: string }) => (
    <Link href={href}>
      <a {...props} />
    </Link>
  ),
  img: ({ src, alt, ...props }: { src: string; alt: string }) => {
    const sizeInfo = imageUrlToDimensions(src)
    return <Image alt={alt} src={src} width={sizeInfo.width} height={sizeInfo.height} {...props} />
  },
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const Template = getTemplate(router.pathname) as any

  const meta = (Component as any).meta || {}
  const filename = (Component as any).filename || {}
  const files = (Component as any).files || {}

  return (
    <MDXProvider components={components}>
      <Template meta={meta} path={router.pathname} filename={filename} files={files}>
        <Head>
          <script
            // fathom analytics
            src="https://impressive-ziggy-stardust.flightcontrol.dev/script.js"
            data-site="MJTFLQYZ"
            defer
          ></script>
        </Head>
        <Component {...pageProps} />
      </Template>
    </MDXProvider>
  )
}

export default MyApp
