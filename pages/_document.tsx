import { Document, PreviewModeScript } from '@makeswift/runtime/next'
import { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
