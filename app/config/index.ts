import { appid, version } from '../../package.json'

const isDev = process.env.NODE_ENV === 'development'

export { appid, isDev, version }
