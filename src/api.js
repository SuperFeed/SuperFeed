const req = (host) => ({
  get: (path) => fetch(`${host}${path}`).then((res) => res.json()),
  post: (path, body) => fetch(host, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then((res) => res.json())
})

export const SF_API = req(process.env.NODE_ENV !== 'production'
  ? '//localhost:3005/superfeed_'
  : 'https://reoz4sq35d.execute-api.us-east-1.amazonaws.com/prod/superfeed_'
)
