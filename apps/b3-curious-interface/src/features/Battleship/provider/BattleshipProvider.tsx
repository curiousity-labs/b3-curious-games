import { ReactNode, useMemo, useReducer } from 'react';
import { BattleshipContext } from './context';
import { battleshipInitialState, reducer } from './gameplay/reducer';
import { useLoadBattleshipGame } from './gameplay/hooks/useLoadBattleshipGame';

export function BattleshipProvider({ component }: { component: ReactNode }) {
  const [battleshipGame, dispatch] = useReducer(reducer, battleshipInitialState)

  useLoadBattleshipGame({ dispatch })
  const value = useMemo(() => ({
    battleshipGame,
    loaders: []
  }), [battleshipGame])

  return <BattleshipContext.Provider value={value} >{component}</BattleshipContext.Provider>;
}