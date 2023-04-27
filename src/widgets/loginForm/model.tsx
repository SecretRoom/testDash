import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { LoginAPI } from 'shared/api/login/types'
import { loginA } from './api'
import { LoginPage } from './types'
import { UI } from './ui'

const LoginForm = () => {
  const [login, setLogin] = useState<LoginPage['login']>('')
  const [psw, setPsw] = useState<LoginPage['psw']>('')
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (data: LoginAPI['dataSingIn']) => {
      return loginA(data)
    },
    onSuccess: async () => {
      localStorage.setItem('isAuth', '1')
      navigate("/")
    },
  })

  const handleChangePsw = (value: string) => {
    setPsw(value)
  }
  const handleChangeLogin = (value: string) => {
    setLogin(value)
  }
  const handleSignIn = () => {
    mutation.mutate({ login, psw })
  }

  useEffect(() => {
    const pressEnter = ({code }: KeyboardEvent) => {
      if((code || '').includes('Enter')) {
        handleSignIn()
      }
    }
    document.addEventListener('keyup', pressEnter)
    return(() =>{
      document.removeEventListener('keyup', pressEnter)
    }) 
  }, [])

  return (
    <UI 
      psw={psw}
      login={login}
      handleChangePsw={handleChangePsw}
      handleChangeLogin={handleChangeLogin}
      handleSignIn={handleSignIn}
    />
  )
}

export { LoginForm }
