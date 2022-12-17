import { Box, Center, ComponentWithAs, HStack, IconProps } from '@chakra-ui/react'
import { useMemo } from 'react';
import { Bishop, King, Pawn, Queen, Rook } from './components/Pieces';
import { Knight } from './components/Pieces/Knight';


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

type Team = {
  color: string,
  name: string,
  isFirst: boolean,
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
    const isOffColorSquare = !(vI % 2) && !(hI % 2) || vI % 2 && hI % 2

    return {
      location: location,
      color: isOffColorSquare ? 'black.300' : 'grayscale.white'
    }
  })).reverse()

  const teamOnePieces: Piece[] = useMemo(() => {
    // @todo position information should be updated by contract
    const team: Team = { 
      color: 'black.900',
      name:'Decent DAO',
      isFirst: true,
    }

    return [{
      type: PieceType.King,
      team,
      rule: rules[PieceType.King],
      Icon: King,
      currentPos: 'd1',
    },
    {
      type: PieceType.Queen,
      team,
      rule: rules[PieceType.Queen],
      Icon: Queen,
      currentPos: 'e1',
    },
    {
      type: PieceType.Knight,
      team,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'b1',
    },
    {
      type: PieceType.Knight,
      team,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'g1',
    },
    {
      type: PieceType.Bishop,
      team,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'c1',
    },
    {
      type: PieceType.Bishop,
      team,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'f1',
    },
    {
      type: PieceType.Rook,
      team,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'a1',
    },
    {
      type: PieceType.Rook,
      team,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'h1',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'a2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'b2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'c2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'd2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'e2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'f2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'g2',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'h2',
    },
    ]
  }, [])

  const teamTwoPieces: Piece[] = useMemo(() => {
    // @todo Most data will come from contracts and only need to be formated
    // @todo don't forget to add listerners for updates
    const team: Team = { 
      color: 'gold.500',
      name:'Decent DAO',
      isFirst: true,
    }

    return [{
      type: PieceType.King,
      team,
      rule: rules[PieceType.King],
      Icon: King,
      currentPos: 'd8',
    },
    {
      type: PieceType.Queen,
      team,
      rule: rules[PieceType.Queen],
      Icon: Queen,
      currentPos: 'e8',
    },
    {
      type: PieceType.Knight,
      team,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'b8',
    },
    {
      type: PieceType.Knight,
      team,
      rule: rules[PieceType.Knight],
      Icon: Knight,
      currentPos: 'g8',
    },
    {
      type: PieceType.Bishop,
      team,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'c8',
    },
    {
      type: PieceType.Bishop,
      team,
      rule: rules[PieceType.Bishop],
      Icon: Bishop,
      currentPos: 'f8',
    },
    {
      type: PieceType.Rook,
      team,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'a8',
    },
    {
      type: PieceType.Rook,
      team,
      rule: rules[PieceType.Rook],
      Icon: Rook,
      currentPos: 'h8',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'a7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'b7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'c7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'd7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'e7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'f7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'g7',
    },
    {
      type: PieceType.Pawn,
      team,
      rule: rules[PieceType.Pawn],
      Icon: Pawn,
      currentPos: 'h7',
    },
    ]
  }, [])

  const updatedChessboard = useMemo(() => {
    return chessBoardData.map((col) => col.map(square => {
      const locatedTeamOnePiece = teamOnePieces.find(piece => piece.currentPos === square.location)
      const locatedTeamTwoPiece = teamTwoPieces.find(piece => piece.currentPos === square.location)
      if (locatedTeamOnePiece) {
        return { ...square, Piece: locatedTeamOnePiece }
      }
      if (locatedTeamTwoPiece) {
        return { ...square, Piece: locatedTeamTwoPiece }
      }
      return square
    }))
  }, [chessBoardData, teamOnePieces, teamTwoPieces])


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

export default App
