
type API = {
  login: {
    login: string
    psw: string
  }
}

type User = {
  id: number
  name: string
  psw: string
  login: string
}

type Users = Array<User>

type DB = {
  users: Users
}


export type { API, User, Users, DB }
