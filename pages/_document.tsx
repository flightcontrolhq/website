import { Document, PreviewModeScript } from '@makeswift/runtime/next'
import { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            src="https://impressive-ziggy-stardust.flightcontrol.dev/script.js"
            data-site="MJTFLQYZ"
            defer
          ></script>
          <PreviewModeScript isPreview={this.props.__NEXT_DATA__.isPreview} />
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
