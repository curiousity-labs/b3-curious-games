import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
import { HashRouter } from 'react-router-dom'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        {children}
      </HashRouter>
    </ChakraProvider>
  )
}
