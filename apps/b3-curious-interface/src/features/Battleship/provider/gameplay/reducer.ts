import { intialAddressState } from './../../../../hooks/utils/useAddressLookup';
import { constants } from 'ethers';
import { BattleshipStateAction, BattleshipStateActions } from './actions';
import { IBattleshipState } from './types';

export const battleshipInitialState: IBattleshipState = {
  gameAddress: constants.AddressZero,
  teamOne: intialAddressState,
  teamTwo: intialAddressState,
  gameWinner: constants.AddressZero,
  battleshipContract: null,
  actions: {
    setPieces: async () => { },
    takeTurn: async () => { }
  },
  isBattleshipLoaded: false
}

export function reducer(state: IBattleshipState, action: BattleshipStateActions) {
  switch (action.type) {
    case BattleshipStateAction.SET_GAME: {
      return { ...state, ...action.payload, isBattleshipLoaded: true }
    }
    case BattleshipStateAction.Reset: {
      return state
    }
    default:
      return state;
  }
} 