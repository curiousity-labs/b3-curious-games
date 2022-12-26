import { ReactNode, useMemo, useReducer } from 'react';
import { StoreContext } from './context';

export function StoreProvider({ children }: { children: ReactNode }) {
  /**
   * appState -> Store for information
   */
  const [appState, appDispatch] = useReducer(() => [], [])


  const value = useMemo(() => ({
    appState: {
      isAccountConnected: false
    },
    loaders: []
  }), [])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}  