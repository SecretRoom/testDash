import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  useColorMode,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Navlinks from 'shared/providers/navlink/ui';

import style from './style.module.scss'
import { UserProfileMenu } from 'entities/user/ui';

const Sidebar = function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent =  ({ onClose, ...rest }: SidebarProps) => {
  // -webkit-box-shadow: 0px 5px 10px 2px rgba(112, 105, 248, 0.4);
  // -moz-box-shadow: 0px 5px 10px 2px rgba(112, 105, 248, 0.4);
  // box-shadow: 0px 5px 10px 2px rgba(112, 105, 248, 0.4);
  return (
    <Box className={style['sidebar']}>
      <Box
        transition="3s ease"
        bg={useColorModeValue('purple.400', 'purple.700')}
        boxShadow='lg'
        h="full"
        className={style['sidebar-content']}
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        <Navlinks />
      </Box>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      className={style['header']}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="swap-theme"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
        <Flex alignItems={'center'}>
          <UserProfileMenu />
        </Flex>
      </HStack>
    </Flex>
  );
};

export { Sidebar as UI }
