import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function GameContainer({ children }: { children: ReactNode }) {
  return (
    <Box position="relative" sx={{
      '&:first-of-type': {
        borderTopLeftRadius: '1rem'
      }
    }}>
      {children}
    </Box>
  )
}