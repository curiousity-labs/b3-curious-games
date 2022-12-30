import { BattleGame, Turn } from './types'

export enum BattleshipStateAction {
  SET_READINESS,
  SET_GAME,
  SET_TURNS,
  Reset,
}

export type BattleshipStateActions =
  | { type: BattleshipStateAction.Reset }
  | { type: BattleshipStateAction.SET_READINESS; payload: string[] }
  | { type: BattleshipStateAction.SET_GAME; payload: BattleGame }
  | { type: BattleshipStateAction.SET_TURNS; payload: Turn[] }
