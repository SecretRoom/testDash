import { Axios } from "shared/utils/fetch"
import { UserAPI } from "./types"

const UserAPI = {
  login: async (data: UserAPI['dataSingIn']): Promise<Response> => {
    return await Axios.post('/login', data)
  }
}

export { UserAPI }
