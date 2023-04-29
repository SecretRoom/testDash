import localforage from 'localforage'
import { rest, RestContext } from 'msw'
import * as R from 'ramda'
import { API, Users } from './types'

const baseUrl = "https://my-json-server.typicode.com/SecretRoom/mockjson/"

const getMockData = async <T>(ctx: RestContext, url: string): Promise<T> => {
  const originalResponse = await ctx.fetch(baseUrl + url)
  return await originalResponse.json()
}

export const handlers = [
  rest.post('/api/login', async(req, res, ctx) => {
    const { login, psw } = await req.json() as API['login']
    const data = await getMockData<Users>(ctx, 'users')
    const user = data.find((item) => item['login'] === login)
    if(R.isNil(user) || user?.psw !== psw) return res(ctx.status(401, 'Incorrect login/password'))
    localforage.setItem('isAuth', true)
    return res(
      ctx.status(200),
      ctx.json(R.dissoc('psw',user))
    )
  }),
  rest.get('/api/dashboards', async(_req, res, ctx) => {
    const data = await getMockData(ctx, 'dashboards')
    if(R.isNil(data)) return res(ctx.status(204), ctx.json([]))
    return res(
      ctx.status(200),
      ctx.json(data as any)
    )
  })
]