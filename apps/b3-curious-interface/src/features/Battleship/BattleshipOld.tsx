import { Box, Center, HStack } from '@chakra-ui/react'
import { BSquare } from './types'
import { colLoc, rowLoc } from './constants'
import { useMemo } from 'react'
import { mockTeamOnePieces, mockTeamTwoPieces } from './mock'

export function Battleship() {
  const teamOneBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = `${hPos}:${vPos}`
        return {
          location,
        }
      }),
    )
    .reverse()
  const teamTwoBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = `${hPos}:${vPos}`
        return {
          location,
        }
      }),
    )
    .reverse()

  const updatedTeamOneboard = useMemo(() => {
    return teamOneBoard.map((col) =>
      col.map((square) => {
        const locatedTeamOnePiece = mockTeamOnePieces.find((ship) =>
          ship.find((pos) => pos === square.location),
        )
        if (locatedTeamOnePiece) {
          const [currentVpos] = square.location.split(':')
          const isPlacedVertically = locatedTeamOnePiece.every((pos) => {
            const [vPos] = pos.split(':')
            return vPos === currentVpos
          })
          return { ...square, Piece: { ...locatedTeamOnePiece, isPlacedVertically } }
        }
        return square
      }),
    )
  }, [teamOneBoard])

  const updateTeamTwoBoard = useMemo(() => {
    return teamTwoBoard.map((col) =>
      col.map((square) => {
        const locatedTeamTwoPiece = mockTeamTwoPieces.find((ship) =>
          ship.find((pos) => pos === square.location),
        )
        if (locatedTeamTwoPiece) {
          const [currentVpos] = square.location.split(':')
          const isPlacedVertically = locatedTeamTwoPiece.every((pos) => {
            const [vPos] = pos.split(':')
            return vPos === currentVpos
          })
          return { ...square, Piece: { ...locatedTeamTwoPiece, isPlacedVertically } }
        }
        return square
      }),
    )
  }, [teamTwoBoard])

  return (
    <Center minH='100vh'>
      <HStack>
        <Box>
          {updatedTeamOneboard.map((row, i) => {
            return (
              <HStack key={i} gap='0'>
                {row.map((square) => {

                  return (
                    <Center
                      key={square.location}
                      bgGradient='linear(to-bl, blue.400, blue.500)'
                      border='1px'
                      borderStyle='dotted'
                      borderColor='blue.900'
                      w={12}
                      h={12}
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
                          bg='grayscale.400'
                          w={square.Piece.isPlacedVertically ? 'auto' : 'full'}
                          h={!square.Piece.isPlacedVertically ? 'auto' : 'full'}
                          p='0.5rem'
                          transform='rotate(1turn)'
                        >
                          <Center boxSize='1rem' bg='black.400' rounded='100%'>
                            <Box boxSize='0.7rem' rounded='100%' bg='alert-red.normal' />
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
        <Box>
          {updateTeamTwoBoard.map((row, i) => {
            return (
              <HStack key={i} gap='0'>
                {row.map((square) => {
                  return (
                    <Center
                      key={square.location}
                      bgGradient='linear(to-br, blue.400, blue.500)'
                      border='1px'
                      borderStyle='dotted'
                      borderColor='blue.900'
                      w={12}
                      h={12}
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
                          bg='grayscale.400'
                          w={square.Piece.isPlacedVertically ? 'auto' : 'full'}
                          h={!square.Piece.isPlacedVertically ? 'auto' : 'full'}
                          p='0.5rem'
                          transform='rotate(1turn)'
                        >
                          <Center boxSize='1rem' bg='black.400' rounded='100%'>
                            <Box boxSize='0.7rem' rounded='100%' bg='alert-red.normal' />
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
      </HStack>
    </Center>
  )
}
