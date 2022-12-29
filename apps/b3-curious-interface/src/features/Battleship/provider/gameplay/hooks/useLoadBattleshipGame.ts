import { BattleshipStateAction } from './../actions';
import { useAddressLookup } from './../../../../../hooks/utils/useAddressLookup';
import { useAppProvider } from './../../../../../providers/store/context';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface IUseBattleshipGame {
  dispatch: any;

}

export function useLoadBattleshipGame({ dispatch }: IUseBattleshipGame) {
  const params = useParams();
  const { contracts } = useAppProvider()
  const { lookupAddress } = useAddressLookup()

  const loadGame = useCallback(async () => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts || !params.gameAddress) {
      return;
    }
    const gameAddress = params.gameAddress
    if (gameAddress) {
      const gameContract = b3Contracts.battleshipImpl.attach(gameAddress)

      const teamOneAddress = await gameContract.team1()
      const teamOneAddressInfo = await lookupAddress(teamOneAddress)

      const teamTwoAddress = await gameContract.team2()
      const teamTwoAddressInfo = await lookupAddress(teamTwoAddress)

      const winner = await gameContract.game_winner()

      dispatch({
        type: BattleshipStateAction.SET_GAME,
        payload: {
          gameAddress,
          teamOne: teamOneAddressInfo,
          teamTwo: teamTwoAddressInfo,
          gameWinner: winner,
          battleshipContract: null,
        }
      })
    }
  }, [params, dispatch, contracts, lookupAddress])

  useEffect(() => {
    loadGame()
  }, [loadGame])
  return;
}