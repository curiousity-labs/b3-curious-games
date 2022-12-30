import { GameState, useCheckGameState } from '../hooks/useCheckGameState'

export function GameDisplay() {
  const { state } = useCheckGameState()

  switch (state) {

    case GameState.GameInitilized:
      return null
    case GameState.GameStart:
      return null
    case GameState.GameFinished:
      return null
    case GameState.None:
    default:
      return null
  }
}