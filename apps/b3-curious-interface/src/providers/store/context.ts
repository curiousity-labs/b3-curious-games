import { createContext, useContext, Context } from 'react'
import { AppState } from './session/types';

export interface IStoreContext {
  appState: AppState;
  loaders: string[] // define these
}

export const StoreContext = createContext<IStoreContext | null>(null)

export const useAppProvider = (): IStoreContext =>
  useContext(StoreContext as Context<IStoreContext>)