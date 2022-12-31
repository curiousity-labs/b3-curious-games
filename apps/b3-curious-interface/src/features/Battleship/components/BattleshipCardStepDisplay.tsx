import { GameState, useCheckGameState } from '../hooks/useCheckGameState'
import { BattleshipGameSetup } from './BattleshipGameSetup'

export function BattleshipCardStepDisplay() {
  const { state } = useCheckGameState()

  switch (state) {

    case GameState.GameInitilized:
      return <BattleshipGameSetup />
    case GameState.GameStart:
      return null
    case GameState.GameFinished:
      return null
    case GameState.None:
    default:
      return null
  }
}