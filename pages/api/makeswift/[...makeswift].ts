import { MakeswiftApiHandler } from '@makeswift/runtime/next'

import { getConfig } from 'lib/config'

export default MakeswiftApiHandler(getConfig().makeswift.siteApiKey)
