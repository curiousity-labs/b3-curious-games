import { ReactNode, useMemo, useReducer } from 'react';
import { AppContext } from './context';

export function AppProvider({ children }: { children: ReactNode }) {
  const [appState, appDispatch] = useReducer(() => [], [])

  const value = useMemo(() => ({
    appState: {
      isAccountConnected: false
    },
    loaders: []
  }), [])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}