import { Box, VStack } from '@chakra-ui/react'
import { Pages } from './pages'


function App() {
  return (
    <VStack minH="100vh">
      {/* HEADER */}
      <Box></Box>
      {/* MAIN CONTENT */}
      <Box flexGrow={1}>
        <Pages />
      </Box>
    </VStack>
  )
}

export default App
