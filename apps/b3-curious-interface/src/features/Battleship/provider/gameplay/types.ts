import { AddressInfo } from './../../../../hooks/utils/useAddressLookup';
export interface IBattleshipState {
  gameAddress: string;
  teamOne: AddressInfo;
  teamTwo: AddressInfo;
  gameWinner: string;
  actions: {
    setPieces: () => Promise<void>
    takeTurn: () => Promise<void>
  }
  isBattleshipLoaded: boolean;
}