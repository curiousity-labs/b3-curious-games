import type { AddressInfo } from './../../hooks/utils/useAddressLookup';

export type Team = {
    color: string,
    addressInfo: AddressInfo
}

export type ConnectSquare = {
    location: string,
    color: string,
    // @note undefined = no piece
    // @note Piece = space occupied
    isPiecePlaced?: boolean
}