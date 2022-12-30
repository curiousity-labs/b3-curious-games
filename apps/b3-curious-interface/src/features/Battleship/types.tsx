import { AddressInfo } from '../../hooks/utils/useAddressLookup'
import { Piece } from './models'

export type BSquare = {
    location: string,
    Piece?: Piece,
    // @note undefined = no piece
    // @note Piece = space occupied
}


export type NewGameFormValues = {
    teamOne: string,
    teamOneAddressInfo: AddressInfo
    teamTwo: string,
    teamTwoAddressInfo: AddressInfo
}

export type GameTeamAddress = {
    gameAddress: string,
    teamOneAddress: string,
    teamTwoAddress: string,
    winner: string,
}

export type SetPieceFormValues = {
    team: string,
    ships: string[];
}