import { ComponentWithAs, IconProps } from '@chakra-ui/react'
import { Bishop as BishopPiece, King as KingPiece, Knight as KnightPiece, Pawn as PawnPiece, Queen as QueenPiece, Rook as RookPiece } from '../../components/Pieces';
import { PieceRuleFunc, PieceType, Team } from './types'
import { rules } from './constants';

export class Piece {
  constructor(
    public currentPos: string | null,
    public type: PieceType,
    public team: Team,
    public Icon: ComponentWithAs<'svg', IconProps>,
    public rule: PieceRuleFunc
  ) { }
}

export class King extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.King,
      team,
      KingPiece,
      rules[PieceType.King],
    )
  }
}

export class Queen extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.Queen,
      team,
      QueenPiece,
      rules[PieceType.Queen],
    )
  }
}

export class Bishop extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.Bishop,
      team,
      BishopPiece,
      rules[PieceType.Bishop],
    )
  }
}

export class Knight extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.Knight,
      team,
      KnightPiece,
      rules[PieceType.Knight],
    )
  }
}

export class Rook extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.Rook,
      team,
      RookPiece,
      rules[PieceType.Rook],
    )
  }
}

export class Pawn extends Piece {
  constructor(team: Team, currentPos: string | null) {
    super(
      currentPos,
      PieceType.Pawn,
      team,
      PawnPiece,
      rules[PieceType.Pawn],
    )
  }
}