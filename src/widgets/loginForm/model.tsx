import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserAPI } from 'shared/api/user/types'
import { loginA } from './api'
import { LoginPage } from './types'
import { UI } from './ui'
import { setUserData } from 'entities/user/model'


const LoginForm = () => {
  const [login, setLogin] = useState<LoginPage['login']>('')
  const [psw, setPsw] = useState<LoginPage['psw']>('')
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (data: UserAPI['dataSingIn']) => {
      return loginA(data)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: ({ data }: any )  => {
      localStorage.setItem('isAuth', '1')
      setUserData(data)
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
