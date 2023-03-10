import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
import { HashRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from './network/rainbow-kit.config'
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit'
import { NetworkConfigProvider } from './network/NetworkConfigProvider'
import { StoreProvider } from './store/StoreProvider'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <NetworkConfigProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize='compact' theme={midnightTheme()}>
            <HashRouter>
              <StoreProvider>
                {children}
              </StoreProvider>
            </HashRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </NetworkConfigProvider>
    </ChakraProvider>
  )
}
