import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
import { HashRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from './network/rainbow-kit.config'
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize='compact' theme={midnightTheme()}>
          <HashRouter>{children}</HashRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
