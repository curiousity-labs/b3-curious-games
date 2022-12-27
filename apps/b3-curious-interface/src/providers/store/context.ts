import { createContext, useContext, Context } from 'react'
import { AccountStateActions } from './account/actions'
import { ContractStateActions } from './contract/actions'
import { SessionStateActions } from './session/actions'
import { ContractState } from './contract/types'

export type Dispatch = (
  action: AccountStateActions | ContractStateActions | SessionStateActions,
) => void
export interface IStoreContext {
  contracts: ContractState
  loaders: string[] // define these
  dispatch: Dispatch
}

export const StoreContext = createContext<IStoreContext | null>(null)

export const useAppProvider = (): IStoreContext =>
  useContext(StoreContext as Context<IStoreContext>)
