import { BSquare } from '../types'
import { colLoc, rowLoc } from '../constants'
import { useMemo } from 'react'
import { Piece } from '../models'

export function useBoard(shipLocations: Piece[]) {
  const boardBase: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = `${hPos}${vPos}`
        return {
          location,
        }
      }),
    )
    .reverse()

  const board = useMemo(() => {
    return boardBase.map((col) =>
      col.map((square) => {
        const locatedPiece = shipLocations.find((ship) =>
          ship.locations.find((pos) => pos === square.location),
        )
        if (locatedPiece) {
          return { ...square, Piece: locatedPiece }
        }
        return square
      }),
    )
  }, [boardBase, shipLocations])

  return { board };
}