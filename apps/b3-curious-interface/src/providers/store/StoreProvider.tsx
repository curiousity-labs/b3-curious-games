import { ReactNode, useMemo, useReducer } from 'react';
import { StoreContext } from './context';

export function StoreProvider({ children }: { children: ReactNode }) {
  /**
   * appState -> Store for information
   */
  const [sessionState, sessionDispatch] = useReducer(() => [], [])

  function dispatch({ state, action }: { state: any, action: { type: any, payload: any } }) {
    switch (action.type) {
      default:
        return state
    }
  }


  const value = useMemo(() => ({
    loaders: []
  }), [])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}  