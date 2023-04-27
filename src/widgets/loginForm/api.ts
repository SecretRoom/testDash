import { LoginAPI } from "shared/api/login"
import { LoginAPI as Props } from "shared/api/login/types"

const loginA = (data: Props['dataSingIn']): Promise<Response> => {
  return LoginAPI.login(data)
}

export { loginA }