import { AuthClientPlugin } from '@blitzjs/auth'
import { setupBlitzClient } from '@blitzjs/next'

export { useSession } from '@blitzjs/auth'

setupBlitzClient({
  plugins: [
    AuthClientPlugin({
      cookiePrefix: process.env.APP_ENV === 'production' ? 'flightcontrol2' : 'fc-dev',
    }),
  ],
})
