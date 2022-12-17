import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from './rainbowkit/networkConfig'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize='compact'>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
