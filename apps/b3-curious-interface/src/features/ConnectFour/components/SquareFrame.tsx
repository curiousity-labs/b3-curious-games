import { ReactNode } from 'react'
import { ConnectSquare } from '../types'
import { Center } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  return (
    <Center
      id={square.location}
      key={square.location}
      bg={square.color}
      boxSize={28}
      position='relative'
      overflow='hidden'
      sx={{
        '&': {
          WebkitMarginStart: '0px !important',
          marginInlineStart: '0px',
        },
        '&:hover': {
          border: square.Piece ? '4px' : '2px',
          borderColor: square.Piece ? 'green.500' : 'grayscale.200',
        },
      }}
    >
      {children}
    </Center>
  )
}
