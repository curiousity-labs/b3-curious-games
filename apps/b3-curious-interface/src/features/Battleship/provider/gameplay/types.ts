import { BattleshipImpl } from 'b3-curious-contracts';
import { AddressInfo } from './../../../../hooks/utils/useAddressLookup';

export interface IBattleshipState extends BattleGame {
  actions: {
    setPieces: () => Promise<void>
    takeTurn: () => Promise<void>
  }
  isBattleshipLoaded: boolean;
}

export type BattleGame = {
  gameAddress: string;
  teamOne: AddressInfo;
  teamTwo: AddressInfo;
  gameWinner: string;
  battleshipContract: BattleshipImpl | null;
}