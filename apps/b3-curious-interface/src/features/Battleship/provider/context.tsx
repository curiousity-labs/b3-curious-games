import { createContext, useContext, Context } from 'react'


export interface IBattleshipContext {
  battleshipGame: any
  loaders: string[] // define these
}

export const BattleshipContext = createContext<IBattleshipContext | null>(null)

export const useBattleshipProvider = (): IBattleshipContext =>
  useContext(BattleshipContext as Context<IBattleshipContext>)
