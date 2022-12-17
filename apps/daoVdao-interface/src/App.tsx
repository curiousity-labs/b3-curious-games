import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/react'

const rowLoc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const colLoc = ['1', '2', '3', '4', '5', '6', '7', '8']

enum PieceType {
  King = 'king',
  Queen = 'queen',
  Knight = 'knight',
  Bishop = 'bishop',
  Rook = 'rook',
  Pawn = 'pawn',
}

type PieceRuleFunc = () => void;

const rules: {[key in PieceType]: PieceRuleFunc} = {
  [PieceType.King]: () => { },
  [PieceType.Queen]: () => { },
  [PieceType.Knight]: () => { },
  [PieceType.Bishop]: () => { },
  [PieceType.Rook]: () => { },
  [PieceType.Pawn]: () => { },
}

enum Team {
  White,
  Black
}

type Piece = {
  team: Team,
  type: PieceType
}

type Square = {
  location: string,
  color: string,
  Piece?: Piece
  rule?: PieceRuleFunc
}

function App() {
  const chessBoardData: Square[][] = colLoc.map((vPos, vI) => rowLoc.map((hPos, hI) => {
    const location = hPos + vPos
    const isBlackSquare = !(vI % 2) && !(hI % 2) || vI % 2 && hI % 2

    return {
      location: location,
      color: isBlackSquare ? 'black.900' : 'grayscale.white'
    }
  })).reverse()

  return (
    <Center minH='100vh'>
      <Box>
        {chessBoardData.map((row, i) => {
          return (
            <HStack key={i} gap="0">
              {row.map((square) => {
                return <VStack key={square.location} bg={square.color} p={12} sx={{
                  '&': {
                    'WebkitMarginStart': '0px !important',
                    'marginInlineStart': '0px'
                  }}
                }></VStack>
              })}
            </HStack>
          )
        })}
      </Box>
    </Center>
  )
}

export default App
