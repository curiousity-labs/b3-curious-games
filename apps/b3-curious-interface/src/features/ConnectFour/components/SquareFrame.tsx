import { ReactNode } from 'react'
import { ConnectSquare } from '../types'
import { Box, Center } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  return (
    <Box
      id={square.location}
      key={square.location}
      position='relative'
    >
      <Center
        boxSize="7rem"
        zIndex={0}
        border={square.color ? '16px inset': undefined}
        borderRadius="full"
        borderColor="gold.500"
        sx={{
          '&': {
            WebkitMarginStart: '0px !important',
            marginInlineStart: '0px',
          },
          '&:before': {
            content: '""',
            paddingBottom: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: '5',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
          },
        }}>
        {children}
      </Center>
    </Box>
  )
}
