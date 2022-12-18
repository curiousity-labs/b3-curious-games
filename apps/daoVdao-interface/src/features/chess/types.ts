import { Piece } from './models';

export enum PieceType {
  King = 'king',
  Queen = 'queen',
  Knight = 'knight',
  Bishop = 'bishop',
  Rook = 'rook',
  Pawn = 'pawn',
}

export type PieceRuleFunc = () => void;

export type Team = {
  color: string,
  name: string,
  isFirst: boolean,
}

export type Square = {
  location: string,
  color: string,
  // @note undefined = no piece
  // @note Piece = space occupied
  Piece?: Piece
}