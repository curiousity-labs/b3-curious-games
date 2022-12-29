import { Box } from '@chakra-ui/react';
import { useBattleshipProvider } from './provider/context';
import { VersusBadge } from '../../components/layout/VersusBadge';
import { constants } from 'ethers';

export function Battleship() {
  const { battleshipGame: { gameWinner, teamOne, teamTwo } } = useBattleshipProvider()

  // 3 stages of game
  // PRE_GAME - sets up game each team must set pieces to continue
  // GAMEPLAY - each team can take turns
  // POST_GAME - RESULTS OF GAME shown.
  return (
    <Box>
      <VersusBadge
        isGameOver={gameWinner !== constants.AddressZero}
        isTeamOneWinner={gameWinner === teamOne.full}
        isTeamTwoWinner={gameWinner === teamTwo.full}
        teamOneDisplayName={teamOne.ensName || teamOne.registryDAOName || teamOne.truncated || ''}
        teamTwoDisplayName={teamTwo.ensName || teamTwo.registryDAOName || teamTwo.truncated || ''}
      />
    </Box>
  )
}