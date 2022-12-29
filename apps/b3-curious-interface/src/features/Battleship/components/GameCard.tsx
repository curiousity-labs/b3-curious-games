import { Badge, Flex } from '@chakra-ui/react'
import { GameTeamAddress } from '../types'
import { useAddressLookup } from '../../../hooks/utils/useAddressLookup'
import { constants } from 'ethers'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'

export function GameCard({ game }: { game: GameTeamAddress }) {
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
      <Flex
        bg={!isGameOver ? 'black.900-semi-transparent' : 'grayscale.800'}
        gap={2}
        rounded='0.5rem'
        p={4}
      >
        <Badge
          bg={isTeamOneWinner ? 'green.500' : isTeamTwoWinner ? 'alert-red.normal' : 'sand.700'}
          color='black.900'
          px={2}
          rounded='0.25rem'
        >
          {teamOneDisplayName}
        </Badge>
        <Badge bg='grayscale.400' color='black.900'>
          VS
        </Badge>
        <Badge
          bg={isTeamTwoWinner ? 'green.500' : isTeamOneWinner ? 'alert-red.normal' : 'sand.700'}
          color='black.900'
          px={2}
          rounded='0.25rem'
        >
          {teamTwoDisplayName}
        </Badge>
      </Flex>
    </Flex>
  )
}
