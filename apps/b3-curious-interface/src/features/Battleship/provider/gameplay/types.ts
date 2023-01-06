import { BattleshipImpl } from 'b3-curious-contracts/typechain';
import { AddressInfo } from './../../../../hooks/utils/useAddressLookup';

export interface IBattleshipState extends BattleGame {
  actions: {
    setPieces: () => Promise<void>
    takeTurn: () => Promise<void>
  }
  isBattleshipLoaded: boolean;
}

export interface BattleGame extends BattleData {
  battleshipContract: BattleshipImpl | null;
  readyEvents: string[];
}

export type BattleData = {
  gameAddress: string;
  teamOne: AddressInfo;
  teamTwo: AddressInfo;
  gameWinner: string;
  turns: Turn[];
}

export type Turn = {
  team: string;
  position: string;
  isSuccessful: boolean;
}
