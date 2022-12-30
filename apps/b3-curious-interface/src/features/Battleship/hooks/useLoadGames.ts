import { GameTeamAddress } from './../types';
import { useAppProvider } from './../../../providers/store/context';
import { useEffect, useCallback, useState } from 'react';
import { TypedListener } from 'b3-curious-contracts/typechain/common';
import { GameCreatedEvent } from 'b3-curious-contracts/typechain/BattleshipFactory';
export function useLoadGames() {
  const { contracts } = useAppProvider()
  const [games, setGames] = useState<GameTeamAddress[]>([])

  const loadGames = useCallback(async () => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts) {
      return;
    }

    const gameAddresses = await b3Contracts.battleshipFactory.getGames();

    const gamesWTeamAddr = await Promise.all(gameAddresses.map(async (_gameAddress) => {
      const gameContract = b3Contracts.battleshipImpl.attach(_gameAddress)
      return {
        gameAddress: _gameAddress,
        teamOneAddress: await gameContract.teamOne(),
        teamTwoAddress: await gameContract.teamTwo(),
        winner: await gameContract.game_winner()
      }
    }))
    setGames(gamesWTeamAddr)
  }, [contracts])

  const newGameListener: TypedListener<GameCreatedEvent> = useCallback(async (_gameAddress, teamOne, teamTwo) => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts) {
      return;
    }
    const gameContract = b3Contracts.battleshipImpl.attach(_gameAddress)
    const gameInfo = {
      gameAddress: _gameAddress,
      teamOneAddress: teamOne,
      teamTwoAddress: teamTwo,
      winner: await gameContract.game_winner()
    }
    setGames(prevGames => [...prevGames, gameInfo])
  }, [contracts])

  useEffect(() => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts) {
      return;
    }

    b3Contracts.battleshipFactory.on(b3Contracts.battleshipFactory.filters.GameCreated(), newGameListener)
    return () => {
      b3Contracts.battleshipFactory.off(b3Contracts.battleshipFactory.filters.GameCreated(), newGameListener)
    }
  }, [contracts, newGameListener])

  useEffect(() => {
    loadGames()
  }, [loadGames])
  return { games };
}