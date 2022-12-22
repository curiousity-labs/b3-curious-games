import { Piece } from './models'

export type BSquare = {
    location: string,
    Piece?: Piece,
    // @note undefined = no piece
    // @note Piece = space occupied
}

export type BSTeam = {
    color: string
    name: string
    isFirst: boolean
}

export type ShipRange = { starPos: string; endPos: string }