import { createAPI } from 'reqq'

export const SF_API = createAPI('/api/')

export const APP_ID = process.env.NODE_ENV === 'production' && process.env.FB_ENV !== 'local'
  ? '1704028006536118'
  : '1704068519865400'
