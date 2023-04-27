export type LoginPage = {
  login: string
  psw: string
  handleChangePsw: (value: string) => void
  handleChangeLogin: (value: string) => void
  handleSignIn: () => void
}
