import { NewGameFormValues, PiecesType, ShipOrientation } from './types'

export const rowLoc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
export const colLoc = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const pieces = [PiecesType.AIRCRAFT_CARRIER, PiecesType.BATTLESHIP, PiecesType.CRUISER, PiecesType.SUBMARINE, PiecesType.DESTROYER]
export const initialOrientation = new Array(6).fill(ShipOrientation.Horizontal)
export const newGameInitialValues: NewGameFormValues = {
  teamOne: '',
  teamOneAddressInfo: {
    full: null,
    truncated: null,
    ensName: null,
    registryDAOName: null,
    isSafe: false,
  },
  teamTwo: '',
  teamTwoAddressInfo: {
    full: null,
    truncated: null,
    ensName: null,
    registryDAOName: null,
    isSafe: false
  },
}
