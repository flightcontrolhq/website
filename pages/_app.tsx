import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '../lib/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    document.cookie = 'ref=' + router.query.ref
  }, [router.query.ref])
  return <Component {...pageProps} />
}
