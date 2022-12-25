import { Button, Flex, Text } from '@chakra-ui/react';
import { constants } from 'ethers';
import { ReactNode } from 'react';

function HeaderWrapper({ children }: { children?: ReactNode }) {
  return (
    <Flex justifyContent="space-around" alignItems="center" h="full" textStyle="text-sm-mono-semibold" px={4}>
      {children}
    </Flex>
  )
}

export function Header() {
  const isLoading = false;
  const isConnected = true;

  if (isLoading) {
    return <HeaderWrapper>Loading...</HeaderWrapper>
  }

  if (!isConnected) {
    return <HeaderWrapper><Button>Connect Wallet</Button></HeaderWrapper>
  }
  return (
    <HeaderWrapper>
      <Flex w="full" h="full" flexDirection="column" justifyContent="center" alignItems="flex-end">
        <Text>{constants.AddressZero}</Text>
        <Text>nullAddress.eth</Text>
      </Flex>
    </HeaderWrapper>
  )
}