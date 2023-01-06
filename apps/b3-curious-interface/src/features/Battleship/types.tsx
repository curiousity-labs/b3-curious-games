import { AddressInfo } from '../../hooks/utils/useAddressLookup'
import { Piece } from './models'

export type BSquare = {
    location: string,
    Piece?: Piece,
}


export type NewGameFormValues = {
    teamOne: string,
    teamOneAddressInfo: AddressInfo
    teamTwo: string,
    teamTwoAddressInfo: AddressInfo
}

export type GameData = {
    gameAddress: string,
    teamOneAddress: string,
    teamTwoAddress: string,
    winner: string,
    turns: number[]
}

export type SetPieceFormValues = {
    team: string,
    ships: Piece[];
}

export enum PiecesType {
    None,
    DESTROYER,
    SUBMARINE,
    CRUISER,
    BATTLESHIP,
    AIRCRAFT_CARRIER,
}

export enum ShipOrientation {
    Horizontal,
    Veritical
}