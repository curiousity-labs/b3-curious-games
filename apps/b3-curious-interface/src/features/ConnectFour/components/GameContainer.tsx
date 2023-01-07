import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function GameContainer({ children }: { children: ReactNode }) {
  return (
    <Box position="relative" overflow="hidden" h="fit-content">
      {children}
    </Box>
  )
}