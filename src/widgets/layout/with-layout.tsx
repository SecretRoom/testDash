/* eslint-disable react-hooks/rules-of-hooks */
import { Navbar } from 'widgets/navbar/model'
import compose from "compose-function";
import style from './style.module.scss'
import { useLocation } from 'react-router';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Layout = (component: () => React.ReactNode) => () => {
  const location = useLocation()
  return location.pathname !== '/login' ? (
    <Box className={style["workspace"]} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Box className={style["content"]}>
        {component()}
      </Box>     
    </Box>
  ) 
  : (<>{component()}</>)
};

export const withLayout = compose(Layout)
