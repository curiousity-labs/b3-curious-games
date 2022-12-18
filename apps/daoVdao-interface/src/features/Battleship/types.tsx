import { Piece } from './models'

export type BSquare = {
    location: string,
    // @note undefined = no piece
    // @note Piece = space occupied
    Piece?: Piece
}