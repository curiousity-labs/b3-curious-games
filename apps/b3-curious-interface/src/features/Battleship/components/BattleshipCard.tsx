import { Flex } from '@chakra-ui/react'
import { GameTeamAddress } from '../types'
import { useAddressLookup } from '../../../hooks/utils/useAddressLookup'
import { constants } from 'ethers'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'
import { VersusBadge } from '../../../components/layout/VersusBadge'

export function BattleshipCard({ game }: { game: GameTeamAddress }) {
  const navigate = useNavigate()
  const teamOneDisplayName = useAddressLookup(game.teamOneAddress).displayName
  const teamTwoDisplayName = useAddressLookup(game.teamTwoAddress).displayName

  if (!teamOneDisplayName || !teamTwoDisplayName) {
    return null
  }

  const isGameOver = game.winner !== constants.AddressZero
  const isTeamOneWinner = game.winner === game.teamOneAddress && isGameOver
  const isTeamTwoWinner = game.winner === game.teamTwoAddress && isGameOver

  return (
    <Flex
      bg='black.900-semi-transparent'
      px={4}
      py={4}
      alignItems='center'
      justifyContent='center'
      rounded='0.75rem'
      maxW='sm'
      cursor="pointer"
      onClick={() => navigate(ROUTES.battleshipGame.relative(game.gameAddress))}
    >
      <VersusBadge
        isGameOver={isGameOver}
        isTeamOneWinner={isTeamOneWinner}
        isTeamTwoWinner={isTeamTwoWinner}
        teamOneDisplayName={teamOneDisplayName}
        teamTwoDisplayName={teamTwoDisplayName}
      />
    </Flex >
  )
}
