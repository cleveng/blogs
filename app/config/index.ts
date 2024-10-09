import { appid, version } from '../../package.json'

const isDev = process.env.NODE_ENV === 'development'

const graphqlUri = process.env.NEXT_PUBLIC_GRAPHQL_URI
const loginURL = process.env.NEXT_PUBLIC_LOGIN_URI

export { appid, graphqlUri, isDev, version, loginURL }
