import { ShipOrientation } from './../features/Battleship/types';
import { rowLoc, colLoc } from '../features/Battleship/constants';
import { Piece } from '../features/Battleship/models';

export function createVerticalShip(colIndex: number, pos: string[], shipSize: number, shipMousePiecePos: string, piecePartsEnds: number[], ships: Piece[]) {
  const shipPiecesSides = colLoc.filter((_, i) => {
    const isPieceBefore = i >= colIndex - piecePartsEnds[0]
    const isNotPiece = i !== colIndex
    const isPieceAfter = i <= colIndex + piecePartsEnds[1]
    return isPieceBefore && isNotPiece && isPieceAfter
  })
  if (shipPiecesSides.length === shipSize - 1) {
    const shipPieces = [...shipPiecesSides.map((_y) => pos[0] + _y), shipMousePiecePos];
    const setPiecesLocations = ships.map((ship) => ship.locations).flat()
    const isOverlapping = shipPieces.some(loc => setPiecesLocations.includes(loc))
    if (!isOverlapping) {
      const piece = new Piece(shipPieces, 'grayscale.400', true);
      return piece;
    }
  }
}
export function createHorizontalShip(rowIndex: number, pos: string[], shipSize: number, shipMousePiecePos: string, piecePartsEnds: number[], ships: Piece[]) {
  const shipPiecesSides = rowLoc.filter((_, i) => {
    const isPieceBefore = i >= rowIndex - piecePartsEnds[0]
    const isNotPiece = i !== rowIndex
    const isPieceAfter = i <= rowIndex + piecePartsEnds[1]
    return isPieceBefore && isNotPiece && isPieceAfter
  })
  if (shipPiecesSides.length === shipSize - 1) {
    const shipPieces = [...shipPiecesSides.map((_x) => _x + pos[1]), shipMousePiecePos];

    const setPiecesLocations = ships.map((ship) => ship.locations).flat()
    const isOverlapping = shipPieces.some(loc => setPiecesLocations.includes(loc))
    if (!isOverlapping) {
      const piece = new Piece(shipPieces, 'grayscale.400', false);
      return piece;
    }
  }
}

export type CreateShipParams = {
  rowIndex: number,
  colIndex: number,
  pos: string[], // [x, y]
  piecePartsEnds: number[] // [leftside, rightside] + main === shipPiece count
  shipSize: number,
  shipOrientation: ShipOrientation[],
  shipMousePiecePos: string,
  ships: Piece[]
}

export function createShip({ rowIndex, colIndex, pos, shipSize, shipMousePiecePos, shipOrientation, piecePartsEnds, ships }: CreateShipParams) {
  if (shipOrientation[shipSize] === ShipOrientation.Horizontal) {
    return createHorizontalShip(rowIndex, pos, shipSize, shipMousePiecePos, piecePartsEnds, ships)
  } else {
    return createVerticalShip(colIndex, pos, shipSize, shipMousePiecePos, piecePartsEnds, ships);
  }
}