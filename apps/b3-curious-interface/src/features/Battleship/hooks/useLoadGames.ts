import { useAddressLookup } from './../../../hooks/utils/useAddressLookup';
import { useAppProvider } from './../../../providers/store/context';
import { useEffect, useCallback, useState } from 'react';
import { TypedListener } from 'b3-curious-contracts/typechain/common';
import { GameCreatedEvent } from 'b3-curious-contracts/typechain/BattleshipFactory';
import { BattleData } from '../provider/gameplay/types';
export function useLoadGames() {
  const { contracts } = useAppProvider()
  const [games, setGames] = useState<BattleData[]>([])
  const [isGamesLoading, setGamesLoading] = useState(true);

  const { lookupAddress } = useAddressLookup()

  const loadGames = useCallback(async () => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts) {
      return;
    }

    const gameAddresses = await b3Contracts.battleshipFactory.getGames();

    const gamesWTeamAddr = await Promise.all(gameAddresses.map(async (_gameAddress) => {
      const gameContract = b3Contracts.battleship.attach(_gameAddress)
      return {
        gameAddress: _gameAddress,
        teamOne: await lookupAddress(await gameContract.teamOne()),
        teamTwo: await lookupAddress(await gameContract.teamOne()),
        gameWinner: await gameContract.game_winner(),
        turns: (await gameContract.queryFilter(gameContract.filters.TurnFinished())).map((event) => ({ team: event.args[0], position: event.args[1], isSuccessful: event.args[2] }))
      }
    }))
    setGames(gamesWTeamAddr)
    setGamesLoading(false);
  }, [contracts, lookupAddress])

  const newGameListener: TypedListener<GameCreatedEvent> = useCallback(async (_gameAddress, teamOne, teamTwo) => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts) {
      return;
    }
    const gameContract = b3Contracts.battleship.attach(_gameAddress)
    const gameInfo = {
      gameAddress: _gameAddress,
      teamOne: await lookupAddress(teamOne),
      teamTwo: await lookupAddress(teamTwo),
      gameWinner: await gameContract.game_winner(),
      turns: (await gameContract.queryFilter(gameContract.filters.TurnFinished())).map((event) => ({ team: event.args[0], position: event.args[1], isSuccessful: event.args[2] }))
    }
    setGames(prevGames => [...prevGames, gameInfo])
  }, [contracts, lookupAddress])

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
  return [games, isGamesLoading] as const;
}