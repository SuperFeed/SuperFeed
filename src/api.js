import { createAPI } from 'reqq'

export const SF_API = createAPI(process.env.NODE_ENV !== 'production'
  ? '//localhost:3000/api/'
  : '//superfeed.xyz/api/'
)

export const APP_ID = process.env.NODE_ENV === 'production'
  ? '1704028006536118'
  : '1704068519865400'
