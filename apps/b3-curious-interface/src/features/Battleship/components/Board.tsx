import { HStack, Center, Box } from '@chakra-ui/react'
import { BSquare } from '../types'
import { forwardRef } from 'react'
import { Piece } from '../models';

interface IBoard {
  board: BSquare[][];
  ships: Piece[];
  squareOnClick: ([args]: any) => void;
}

export const Board = forwardRef<HTMLDivElement, IBoard>(({ board, ships, squareOnClick }, ref) => {
  return (
    <Box w='fit-content' ref={ref}>
      {board.map((row, i) => {
        return (
          <HStack key={i} gap='0'>
            {row.map((square) => {
              return (
                <Center
                  key={square.location}
                  id={square.location}
                  bgGradient='linear(to-bl, blue.400, blue.500)'
                  ref={ref}
                  border='1px'
                  borderStyle='dotted'
                  borderColor='blue.900'
                  w={12}
                  h={12}
                  onClick={() => squareOnClick([...ships, square.Piece])}
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
                  {square.Piece && (
                    <Center
                      id={square.location + '-piece'}
                      bg='grayscale.400'
                      w={square.Piece.isPlacedVertically ? 'auto' : 'full'}
                      h={!square.Piece.isPlacedVertically ? 'auto' : 'full'}
                      p='0.5rem'
                      transform='rotate(1turn)'
                    >
                      <Center id={square.location + '-middle'} boxSize='1rem' bg='black.400' rounded='100%'>
                        {square.Piece.isHit && (
                          <Box id={square.location + '-hit'} boxSize='0.7rem' rounded='100%' bg='alert-red.normal' />
                        )}
                      </Center>
                    </Center>
                  )}
                </Center>
              )
            })}
          </HStack>
        )
      })}
    </Box>
  )
})

Board.displayName = 'Board'
