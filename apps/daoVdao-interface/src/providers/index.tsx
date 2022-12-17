import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'

export function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
          {children}
    </ChakraProvider>
  )
}
