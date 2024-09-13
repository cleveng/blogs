// 当前系统版本号
import { version, appid } from '../../package.json'

// 当前环境
const isDev = process.env.NODE_ENV === 'development'

export { version, appid, isDev }
