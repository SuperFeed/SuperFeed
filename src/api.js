import { createAPI } from 'reqq'

export const SF_API = createAPI(process.env.NODE_ENV !== 'production'
  ? '//localhost:3005/superfeed_'
  : 'https://reoz4sq35d.execute-api.us-east-1.amazonaws.com/prod/superfeed_'
)
