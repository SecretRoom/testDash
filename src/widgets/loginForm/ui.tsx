import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { LoginPage } from './types';
import style from './style.module.scss'

const UI = ({
  psw,
  login,

  handleChangePsw,
  handleChangeLogin,
  handleSignIn
}: LoginPage) => { 
  const { colorMode, toggleColorMode } = useColorMode();
  return (
  <Box className={style['login-page']}  bg={useColorModeValue('gray.100', 'gray.900')}>
    <IconButton
      size="lg"
      variant="ghost"
      position='absolute'
      right='0'
      top='0'
      transform={'translate(-50%, 50%)'}
      borderRadius='40px'
      aria-label="swap-theme"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    />
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
              bg={useColorModeValue('purple.400', 'purple.700')}
              color={'white'}
              onClick={handleSignIn}
              _hover={{
                bg: useColorModeValue('purple.500', 'purple.600'),
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Box>
)}

export { UI }
