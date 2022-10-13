import { getPublicConfig } from 'lib/config'

const publicConfig = getPublicConfig()
export const config = {
  dataset: publicConfig.sanity.dataset,
  projectId: publicConfig.sanity.projectId,
  apiVersion: '2022-10-11', // Learn more: https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production',
}
