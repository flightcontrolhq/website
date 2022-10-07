/* eslint-disable @next/next/no-server-import-in-page */
import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/docs')) {
    const rest = pathname.replace(/^\/docs/, '')
    return NextResponse.rewrite('https://flightcontrol-docs.motif.land/' + rest)
  }

  // These are the paths used in motif
  const documentationPaths = [
    '/documentation',
    '/troubleshooting',
    '/http-api',
    '/troubleshooting',
    '/changelog',
  ]

  const isDocumentationPath = documentationPaths.find(path => pathname.startsWith(path))
  if (isDocumentationPath) {
    return NextResponse.rewrite('https://flightcontrol-docs.motif.land/' + pathname)
  }

  return NextResponse.next()
}
