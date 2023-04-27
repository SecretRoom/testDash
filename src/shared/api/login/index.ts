import { Axios } from "shared/utils/fetch"
import { LoginAPI } from "./types"

const LoginAPI = {
  login: async (data: LoginAPI['dataSingIn']): Promise<Response> => {
    return await Axios.post('/login', data)
  }
}

export { LoginAPI }
