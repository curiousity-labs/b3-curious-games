import { createContext, useContext, Context } from 'react'
import { AppState } from './appState/types';

export interface IAppContext {
  appState: AppState;
  loaders: string[] // define these
}

export const AppContext = createContext<IAppContext | null>(null)

export const useAppProvider = (): IAppContext =>
  useContext(AppContext as Context<IAppContext>)