import { Document } from '@makeswift/runtime/next'
import { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            // fathom analytics
            src="https://impressive-ziggy-stardust.flightcontrol.dev/script.js"
            data-site="MJTFLQYZ"
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
