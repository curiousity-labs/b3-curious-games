import { NewGameFormValues } from './types'

export const rowLoc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
export const colLoc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

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
