import { AppProps } from 'next/app'

import '../lib/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
