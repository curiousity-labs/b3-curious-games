import { ReactNode, useMemo, useReducer } from 'react';
import { BattleshipContext } from './context';
import { battleshipInitialState, reducer } from './gameplay/reducer';

export function BattleshipProvider({ children }: { children: ReactNode }) {
  const [battleshipGame, setBattleshipGame] = useReducer(reducer, battleshipInitialState)

  const value = useMemo(() => ({
    battleshipGame: {},
    loaders: []
  }), [])

  return <BattleshipContext.Provider value={value} >{children}</BattleshipContext.Provider>;
}