import { TurnFinishedEvent, TeamReadyEvent } from './../../../../../../../../packages/b3-curious-contracts/typechain/Battleship';
import { BattleshipStateAction } from './../actions';
import { useAddressLookup } from './../../../../../hooks/utils/useAddressLookup';
import { useAppProvider } from './../../../../../providers/store/context';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { TypedListener } from 'b3-curious-contracts/typechain/common';
import { BattleGame } from '../types';

interface IUseBattleshipGame {
  battleshipGame: BattleGame
  dispatch: any;
}

export function useLoadBattleshipGame({ battleshipGame, dispatch }: IUseBattleshipGame) {
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

      const teamOneAddress = await gameContract.teamOne()
      const teamOneAddressInfo = await lookupAddress(teamOneAddress)

      const teamTwoAddress = await gameContract.teamTwo()
      const teamTwoAddressInfo = await lookupAddress(teamTwoAddress)

      const winner = await gameContract.game_winner()

      // const hits = await gameContract.hi

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

  const loadHits = useCallback(async () => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts || !params.gameAddress) {
      return;
    }

    const battleshipContract = b3Contracts.battleshipImpl
    const turnEvents = await battleshipContract.queryFilter(battleshipContract.filters.TurnFinished())
    const turns = turnEvents.map((team, target, isSuccessful) => {
      console.log('🚀 ~ file: useLoadBattleshipGame.ts:60 ~ team, target, isSuccessful', { team, target, isSuccessful })
      return;
    });

    // dispatch({
    //   type: BattleshipStateAction.SET_TURNS,
    //   payload: turns
    // })
  }, [contracts, params.gameAddress])

  useEffect(() => {
    loadHits()
  }, [loadHits])

  const turnListener: TypedListener<TurnFinishedEvent> = useCallback((team: string, target: any, isSuccessful: boolean) => {
    console.log('🚀 ~ file: turnListener.ts:75 ~ team, target, isSuccessful', { team, target, isSuccessful })
    // dispatch({})
  }, [])

  useEffect(() => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts || !params.gameAddress) {
      return;
    }
    const battleshipContract = b3Contracts.battleshipImpl
    battleshipContract.on(battleshipContract.filters.TurnFinished(), turnListener)
    return () => {
      battleshipContract.off(battleshipContract.filters.TurnFinished(), turnListener)
    }
  }, [contracts, params.gameAddress, turnListener])

  const checkTeamReadiness = useCallback(async () => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts || !params.gameAddress) {
      return;
    }

    const battleshipContract = b3Contracts.battleshipImpl
    const readyEvents = await battleshipContract.queryFilter(battleshipContract.filters.TeamReady())

    dispatch({
      type: BattleshipStateAction.SET_READINESS,
      payload: readyEvents.map((teamAddress) => teamAddress)
    })
  }, [contracts, params.gameAddress, dispatch])

  useEffect(() => {
    checkTeamReadiness()
  }, [checkTeamReadiness])

  const readyListener: TypedListener<TeamReadyEvent> = useCallback((team: string) => {
    dispatch({
      type: BattleshipStateAction.SET_READINESS,
      payload: [...battleshipGame.teamsReady, team]
    })
  }, [battleshipGame.teamsReady, dispatch])

  useEffect(() => {
    const b3Contracts = contracts.b3Curious
    if (!b3Contracts || !params.gameAddress) {
      return;
    }
    const battleshipContract = b3Contracts.battleshipImpl
    battleshipContract.on(battleshipContract.filters.TeamReady(), readyListener)
    return () => {
      battleshipContract.off(battleshipContract.filters.TeamReady(), readyListener)
    }
  }, [contracts, params.gameAddress, readyListener])

  useEffect(() => {
    loadGame()
  }, [loadGame])
  return;
}