/* eslint-disable @next/next/no-server-import-in-page */
import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/docs')) {
    return NextResponse.rewrite('https://flightcontrol-docs.motif.land' + pathname)
  }

  return NextResponse.next()
}
