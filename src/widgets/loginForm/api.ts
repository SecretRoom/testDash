import { UserAPI } from "shared/api/user"
import { UserAPI as Props } from "shared/api/user/types"

const loginA = (data: Props['dataSingIn']) => {
  return UserAPI.login(data)
}

export { loginA }