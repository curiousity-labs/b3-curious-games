import { useEffect, useState } from 'react'
import { useBattleshipProvider } from '../provider/context'
import { constants } from 'ethers'

export enum GameState {
  None,
  GameInitilized,
  GameStart,
  GameFinished,
}

export function useCheckGameState() {
  const [state, setState] = useState<GameState>(GameState.None)
  const {
    battleshipGame: { gameWinner, gameAddress, readyEvents },
  } = useBattleshipProvider()

  useEffect(() => {
    // Game is loading
    if (!gameAddress) {
      setState(GameState.None);
      return;
    }

    // Game is finished
    if (gameWinner !== constants.AddressZero) {
      setState(GameState.GameFinished)
      return;
    }
    // Team pieces not set
    if (readyEvents.length < 2) {
      setState(GameState.GameInitilized)
      return
    }
    // Game is ongoing
    if (readyEvents.length == 2) {
      setState(GameState.GameStart);
    }
  }, [gameWinner, gameAddress, readyEvents])

  return { state }
}
