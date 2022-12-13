import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '../lib/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (router.query.ref) {
      document.cookie = `fc-referral-ref=${router.query.ref}; domain=flightcontrol.dev`
    }
  }, [router.query.ref])
  return <Component {...pageProps} />
}
