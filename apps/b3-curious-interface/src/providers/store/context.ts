import { createContext, useContext, Context } from 'react'

export interface IStoreContext {
  loaders: string[] // define these
}

export const StoreContext = createContext<IStoreContext | null>(null)

export const useAppProvider = (): IStoreContext =>
  useContext(StoreContext as Context<IStoreContext>)