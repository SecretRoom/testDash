import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import style from './style.module.scss'
import { LoginPage } from './types';

const UI = ({
  psw,
  login,

  handleChangePsw,
  handleChangeLogin,
  handleSignIn
}: LoginPage) => (
  <div className={style['login-page']}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="login">
            <FormLabel>Login</FormLabel>
            <Input value={login} onChange={({target}) => handleChangeLogin(target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input value={psw} type="password" onChange={({target}) => handleChangePsw(target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Button
              id='signin'
              bg={'blue.400'}
              color={'white'}
              onClick={handleSignIn}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </div>
)

export { UI }
