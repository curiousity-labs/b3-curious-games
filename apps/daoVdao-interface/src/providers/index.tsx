import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from './rainbowkit/networkConfig'
import { theme } from '@decent-org/fractal-ui'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize='compact'>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
