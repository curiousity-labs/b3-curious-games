import { BSquare } from '../types'
import { colLoc, rowLoc } from '../constants'
import { useMemo } from 'react'

export function useBoard() {
  const teamOneBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = `${hPos}:${vPos}`
        return {
          location,
        }
      }),
    )
    .reverse()
  const teamTwoBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = `${hPos}:${vPos}`
        return {
          location,
        }
      }),
    )
    .reverse()

  const updatedTeamOneboard = useMemo(() => {
    // return teamOneBoard.map((col) =>
    //   col.map((square) => {
    //     const locatedTeamOnePiece = mockTeamOnePieces.find((ship) =>
    //       ship.find((pos) => pos === square.location),
    //     )
    //     if (locatedTeamOnePiece) {
    //       const [currentVpos] = square.location.split(':')
    //       const isPlacedVertically = locatedTeamOnePiece.every((pos) => {
    //         const [vPos] = pos.split(':')
    //         return vPos === currentVpos
    //       })
    //       return { ...square, Piece: { ...locatedTeamOnePiece, isPlacedVertically } }
    //     }
    //     return square
    //   }),
    // )
  }, [teamOneBoard])
  return;
}