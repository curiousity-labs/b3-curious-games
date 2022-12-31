import { BSquare } from '../types'
import { colLoc, rowLoc } from '../constants'
import { useMemo } from 'react'
import { Piece } from '../models'

interface IUseBoard {
  ships: Piece[]
  shipLocations: Piece[]
}

export function useBoard({ ships, shipLocations }: IUseBoard) {
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
        const locatedSetPiece = ships.find((ship) =>
          ship.locations.find((pos) => pos === square.location),
        )
        if (locatedSetPiece || locatedPiece) {
          return { ...square, Piece: locatedSetPiece || locatedPiece }
        }
        return square
      }),
    )
  }, [boardBase, shipLocations, ships])

  return { board };
}