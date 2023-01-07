import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { Disconnect } from '@decent-org/fractal-ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAddressLookup } from '../../hooks/utils/useAddressLookup';
import { HeaderLogo } from '../animated/HeaderLogo';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../pages/routes';

function HeaderWrapper({ children }: { children?: ReactNode }) {
  return (
    <Flex justifyContent="space-between" alignItems="center" h="full" textStyle="text-sm-mono-semibold" px={4}>
      <Link to={ROUTES.landing.relative()}>
        <HeaderLogo />

      </Link>
      {children}
    </Flex>
  )
}

export function Header() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { addressInfo } = useAddressLookup(address);

  const isLoading = false; // @todo update with loader from main app provider

  if (isLoading) {
    // return empty wrapper during loading to keep space in dom
    return <HeaderWrapper></HeaderWrapper>;
  }

  if (!address) {
    return <HeaderWrapper><Button onClick={openConnectModal}>Connect Wallet</Button></HeaderWrapper>
  }
  return (
    <HeaderWrapper>
      <Flex gap={2} justifyContent="flex-end" alignItems="center" w="full">
        <Flex w="full" flexDirection="column" justifyContent="center" alignItems="flex-end">
          <Text>{addressInfo.truncated}</Text>
          {addressInfo.ensName && <Text>{addressInfo.ensName}</Text>}
          {addressInfo.registryDAOName && <Text>{addressInfo.registryDAOName}</Text>}
        </Flex>
        <IconButton px={2} py={1} bg="alert-red.dark" minWidth="0px" h="full" aria-label="disconnect" icon={<Disconnect color="grayscale.400" />} onClick={() => disconnect()} />
      </Flex>
    </HeaderWrapper>
  )
}