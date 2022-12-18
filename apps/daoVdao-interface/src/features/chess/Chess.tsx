import { Center, HStack, Box } from '@chakra-ui/react'
import { useMemo } from 'react'
import { colLoc, rowLoc } from './constants'
import { Square } from './types'
import { mockTeamOnePieces, mockTeamTwoPieces } from './mock'

export function Chess() {
  const chessBoardData: Square[][] = colLoc.map((vPos, vI) => rowLoc.map((hPos, hI) => {
    const location = hPos + vPos
    const isOffColorSquare = !(vI % 2) && !(hI % 2) || vI % 2 && hI % 2

    return {
      location: location,
      color: isOffColorSquare ? 'black.400' : 'grayscale.400'
    }
  })).reverse()

  const updatedChessboard = useMemo(() => {
    return chessBoardData.map((col) => col.map(square => {
      const locatedTeamOnePiece = mockTeamOnePieces.find(piece => piece.currentPos === square.location)
      const locatedTeamTwoPiece = mockTeamTwoPieces.find(piece => piece.currentPos === square.location)
      if (locatedTeamOnePiece) {
        return { ...square, Piece: locatedTeamOnePiece }
      }
      if (locatedTeamTwoPiece) {
        return { ...square, Piece: locatedTeamTwoPiece }
      }
      return square
    }))
  }, [chessBoardData])

  return (
    <Center minH='100vh'>
      <Box>
        {updatedChessboard.map((row, i) => {
          return (
            <HStack key={i} gap="0">
              {row.map((square) => {
                // @todo should only be green when its thats team turn
                return <Center key={square.location} bg={square.color} w={24} h={24} sx={{
                  '&': {
                    'WebkitMarginStart': '0px !important',
                    'marginInlineStart': '0px'
                  },
                  '&:hover': {
                    border: square.Piece ? '4px' : '2px',
                    borderColor: square.Piece ? 'green.500' : 'grayscale.200'
                  }
                }
                }>
                  {square.Piece && <square.Piece.Icon boxSize="45px" color={square.Piece.team.color} />}
                </Center>
              })}
            </HStack>
          )
        })}
      </Box>
    </Center>
  )
}