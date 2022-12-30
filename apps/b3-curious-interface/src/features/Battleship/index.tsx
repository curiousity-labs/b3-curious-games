import { Box, Divider, Flex } from '@chakra-ui/react';
import { useBattleshipProvider } from './provider/context';
import { VersusBadge } from '../../components/layout/VersusBadge';
import { constants } from 'ethers';

export function Battleship() {
  const { battleshipGame: { gameWinner, teamOne, teamTwo, turns, teamsReady } } = useBattleshipProvider()
  return (
    <Box>
      <Flex justifyContent="center">
        <VersusBadge
          isGameOver={gameWinner !== constants.AddressZero}
          isTeamOneWinner={gameWinner === teamOne.full}
          isTeamTwoWinner={gameWinner === teamTwo.full}
          teamOneDisplayName={teamOne.ensName || teamOne.registryDAOName || teamOne.truncated || ''}
          teamTwoDisplayName={teamTwo.ensName || teamTwo.registryDAOName || teamTwo.truncated || ''}
        />
      </Flex>
      <Divider />


    </Box>
  )
}