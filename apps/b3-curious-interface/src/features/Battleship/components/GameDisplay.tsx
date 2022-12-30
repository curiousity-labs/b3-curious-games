import { GameState, useCheckGameState } from '../hooks/useCheckGameState'
import { GameInitilized } from './GameInitilized'

export function GameDisplay() {
  const { state } = useCheckGameState()

  switch (state) {

    case GameState.GameInitilized:
      return <GameInitilized />
    case GameState.GameStart:
      return null
    case GameState.GameFinished:
      return null
    case GameState.None:
    default:
      return null
  }
}