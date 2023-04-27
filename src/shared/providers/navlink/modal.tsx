import { ReactNode } from 'react'
import { HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { routes } from '../config';

const Navlink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
)

const Navlinks = () => (
  <HStack
  as={'nav'}
  spacing={4}
  display={{ base: 'none', md: 'flex' }}>
  {routes.map((link) => (
    <Navlink key={link.key}>
      {link.name}
    </Navlink>
  ))}
  </HStack>
);

export default Navlinks
