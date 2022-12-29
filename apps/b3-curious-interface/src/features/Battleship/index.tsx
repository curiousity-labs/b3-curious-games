import { Box } from '@chakra-ui/react';
import { PageTitle } from '../../components/layout/PageTitle';
import { useBattleshipProvider } from './provider/context';
import { addressSubString } from '../../utils/string';

export function Battleship() {
  const { battleshipGame } = useBattleshipProvider()

  // 3 stages of game
  // PRE_GAME - sets up game each team must set pieces to continue
  // GAMEPLAY - each team can take turns
  // POST_GAME - RESULTS OF GAME shown.
  return (
    <Box>
      <PageTitle title={`BattleGame ${addressSubString(battleshipGame.gameAddress)}`} />
    </Box>
  )
}