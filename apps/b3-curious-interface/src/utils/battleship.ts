import { ShipOrientation } from './../features/Battleship/types';
import { rowLoc } from '../features/Battleship/constants';
import { Piece } from '../features/Battleship/models';

export function createVerticalShip(rowIndex: number, pos: string[], shipSize: number, shipMousePiecePos: string, piecePartsEnds: number[]) {
  return;
}
export function createHorizontalShip(rowIndex: number, pos: string[], shipSize: number, shipMousePiecePos: string, piecePartsEnds: number[]) {
  const shipPiecesSides = rowLoc.filter((_, i) => {
    const isPieceBefore = i >= rowIndex - piecePartsEnds[0]
    const isNotPiece = i !== rowIndex
    const isPieceAfter = i <= rowIndex + piecePartsEnds[1]
    return isPieceBefore && isNotPiece && isPieceAfter
  })
  if (shipPiecesSides.length === shipSize - 1) {
    const shipPieces = [...shipPiecesSides.map((_x) => _x + pos[1]), shipMousePiecePos];
    const piece = new Piece(shipPieces, 'grayscale.400', false);
    return piece;
  }
}

export type CreateShipParams = {
  rowIndex: number,
  pos: string[], // [x, y]
  piecePartsEnds: number[] // [leftside, rightside] + main === shipPiece count
  shipSize: number,
  shipOrientation: ShipOrientation[],
  shipMousePiecePos: string,
}

export function createShip({ rowIndex, pos, shipSize, shipMousePiecePos, shipOrientation, piecePartsEnds }: CreateShipParams) {
  if (shipOrientation[shipSize] === ShipOrientation.Horizontal) {
    return createHorizontalShip(rowIndex, pos, shipSize, shipMousePiecePos, piecePartsEnds)
  } else {
    return createVerticalShip(rowIndex, pos, shipSize, shipMousePiecePos, piecePartsEnds);
  }
}