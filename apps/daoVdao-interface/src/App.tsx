import { Box, Center, ComponentWithAs, HStack, IconProps } from '@chakra-ui/react'
import { useMemo } from 'react';
import { King } from './components/Pieces';
import { Queen } from './components/Pieces/Queen';
import { Knight } from './components/Pieces/Knight';
import { Bishop } from './components/Pieces/Bishop';
import { Rook } from './components/Pieces/Rook';
import { Pawn } from './components/Pieces/Pawn';

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

const rules: { [key in PieceType]: PieceRuleFunc } = {
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
  type: PieceType,
  rule: PieceRuleFunc
  // @note undefined = loading
  // @note null = piece captured
  // @note string = piece in play
  currentPos: string | null;
  Icon: ComponentWithAs<'svg', IconProps>,
}

type Square = {
  location: string,
  color: string,
  // @note undefined = no piece
  // @note Piece = space occupied
  Piece?: Piece
}

function App() {
  const chessBoardData: Square[][] = colLoc.map((vPos, vI) => rowLoc.map((hPos, hI) => {
    const location = hPos + vPos
    const isBlackSquare = !(vI % 2) && !(hI % 2) || vI % 2 && hI % 2

    return {
      location: location,
      color: isBlackSquare ? 'gold.400' : 'grayscale.white'
    }
  })).reverse()

  const blackPieces: Piece[] = useMemo(() => {
    // @todo position information should be updated by contract

    return [{
      type: PieceType.King,
      team: Team.Black,
      rule: rules[PieceType.King],
      Icon: King,
      currentPos: 'd1',
    },
    {
      type: PieceType.Queen,
      team: Team.Black,
      rule: rules[PieceType.Queen],
      Icon: Queen,
      currentPos: 'e1',
    },
    {
      type: PieceType.Knight,
      team: Team.Black,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'b1',
    },
    {
      type: PieceType.Knight,
      team: Team.Black,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'g1',
    },
    {
      type: PieceType.Bishop,
      team: Team.Black,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'c1',
    },
    {
      type: PieceType.Bishop,
      team: Team.Black,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'f1',
    },
    {
      type: PieceType.Rook,
      team: Team.Black,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'a1',
    },
    {
      type: PieceType.Rook,
      team: Team.Black,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'h1',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'a2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'b2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'c2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'd2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'e2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'f2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'g2',
    },
    {
      type: PieceType.Pawn,
      team: Team.Black,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'h2',
    },
    ]
  }, [])

  const updatedChessboard = useMemo(() => {
    return chessBoardData.map((col) => col.map(square => {
      const locatedPiece = blackPieces.find(piece => piece.currentPos === square.location)
      if (locatedPiece) {
        return { ...square, Piece: locatedPiece }
      }
      return square
    }))
  }, [chessBoardData, blackPieces])


  return (
    <Center minH='100vh'>
      <Box>
        {updatedChessboard.map((row, i) => {
          return (
            <HStack key={i} gap="0">
              {row.map((square) => {
                return <Center key={square.location} bg={square.color} w={24} h={24} sx={{
                  '&': {
                    'WebkitMarginStart': '0px !important',
                    'marginInlineStart': '0px'
                  }
                }
                }>
                  {square.Piece && <square.Piece.Icon boxSize="45px" />}
                </Center>
              })}
            </HStack>
          )
        })}
      </Box>
    </Center>
  )
}

export default App
