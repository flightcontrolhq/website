import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Script from 'next/script'

import '../lib/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (router.query.ref) {
      document.cookie = `fc-referral-ref=${router.query.ref}; domain=flightcontrol.dev`
    }
  }, [router.query.ref])
  return (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11328012362"/>
    <Script id="google-analytics">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'AW-11328012362');
    `}
    </Script>
    <Component {...pageProps} /> 
  </>
  )
}
