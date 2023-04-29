import { Axios } from "shared/utils/fetch"
import { UserAPI } from "./types"
import * as R from 'ramda'
import { Users } from './types'
import { AxiosPromise } from "axios"

const UserAPI = {
  login: async (value: UserAPI['dataSingIn']): AxiosPromise => {
    if (import.meta.env.MODE !== 'development') {
      const { data }: { data: Users} = await Axios.get('/users')
      const user = data.find((item) => item.login === value.login)
      if(R.isNil(user) || user?.psw !== value.psw) throw new Error() 
      return Promise.resolve({data: R.omit(['psw'],user)} as any)
    }
    return await Axios.post('/login', value)
  }
}

export { UserAPI }
