import { PieceType, PieceRuleFunc } from './types'

export const rowLoc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const colLoc = ['1', '2', '3', '4', '5', '6', '7', '8']

export const rules: { [key in PieceType]: PieceRuleFunc } = {
  [PieceType.King]: () => { },
  [PieceType.Queen]: () => { },
  [PieceType.Knight]: () => { },
  [PieceType.Bishop]: () => { },
  [PieceType.Rook]: () => { },
  [PieceType.Pawn]: () => { },
}

