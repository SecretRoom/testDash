import React, { useState, useEffect } from 'react'
import { getUserData, logout, User } from 'entities/user/model'
import { Avatar, Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { useNavigate } from 'react-router'


const UserProfileMenu = () => {
  const [name, setName] = useState<User["name"]>("")
  const navigate = useNavigate()
  useEffect(() => {
    getUserData<typeof name>(setName, 'name')
  }, [])
  const handleLogout = () => {
    logout().then(() => {
      navigate('/login')
    })
  }
  return (
    <Menu>
    <MenuButton
      py={2}
      transition="all 0.3s"
      _focus={{ boxShadow: 'none' }}>
      <HStack>
        <Avatar
          size={'sm'}
          src={
            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />
        <VStack
          display={{ base: 'none', md: 'flex' }}
          alignItems="flex-start"
          spacing="1px"
          ml="2">
          <Text fontSize="sm">{name}</Text>
        </VStack>
        <Box display={{ base: 'none', md: 'flex' }}>
          <FiChevronDown />
        </Box>
      </HStack>
    </MenuButton>
    <MenuList
      bg={useColorModeValue('white', 'gray.900')}
      borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <MenuItem onClick={handleLogout}>Sign out</MenuItem>
    </MenuList>
  </Menu>

  )
}

export { UserProfileMenu }