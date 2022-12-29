import { createContext, useContext, Context } from 'react'
import { IBattleshipState } from './gameplay/types'


export interface IBattleshipContext {
  battleshipGame: IBattleshipState
  loaders: string[] // define these
}

export const BattleshipContext = createContext<IBattleshipContext | null>(null)

export const useBattleshipProvider = (): IBattleshipContext =>
  useContext(BattleshipContext as Context<IBattleshipContext>)
