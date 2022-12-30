import { createContext, useContext, Context } from 'react'
import { ContractStateActions } from './contract/actions'
import { ContractState } from './contract/types'

export type Dispatch = (
  action: ContractStateActions,
) => void
export interface IStoreContext {
  contracts: ContractState
  dispatch: Dispatch
}

export const StoreContext = createContext<IStoreContext | null>(null)

export const useAppProvider = (): IStoreContext =>
  useContext(StoreContext as Context<IStoreContext>)
