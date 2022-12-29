import { BattleGame } from './types';

export enum BattleshipStateAction {
  SET_GAME,
  Reset
}

export type BattleshipStateActions = { type: BattleshipStateAction.Reset } | { type: BattleshipStateAction.SET_GAME, payload: BattleGame }