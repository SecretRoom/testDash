import { ReactNode } from 'react'
import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { routes } from '../config';
import { IconType } from 'react-icons';

import './style.scss'

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string
  children: ReactNode;
}

const Navlink = ({ icon, to, children, ...rest }: NavItemProps) => (
  <Link
    style={{
      textDecoration: 'none'
    }}
    _focus={{ boxShadow: 'none' }} 
    as={NavLink}
    to={to}
  >
    <Flex
      align="center"
      p="4"
      mx="2"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'white',
        color: '#7069f8',
      }}
      {...rest}>
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: '#7069f8',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
)

const Navlinks = () => (
  <>
    {routes.map((link) => (
      <Navlink key={link.key} icon={link.icon} to={link.path}>
        {link.name}
      </Navlink>
    ))}
  </>
)

export default Navlinks
