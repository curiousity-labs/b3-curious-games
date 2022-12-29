import { Flex, Badge } from '@chakra-ui/react';

interface IVersusBadge {
  isGameOver: boolean,
  isTeamOneWinner: boolean,
  isTeamTwoWinner: boolean,
  teamOneDisplayName: string,
  teamTwoDisplayName: string,
}

export function VersusBadge({ isGameOver, isTeamOneWinner, isTeamTwoWinner, teamOneDisplayName, teamTwoDisplayName }: IVersusBadge) {
  return (
    <Flex
      rounded='0.5rem'
      m={4}
      bg={!isGameOver ? 'alert-red.normal' : 'green.500'}
    >
      <Badge
        bg={isTeamOneWinner ? 'green.500' : isTeamTwoWinner ? 'alert-red.normal' : 'sand.700'}
        color='black.900'
        px={2}
        transform='skew(20deg)'
      >
        {teamOneDisplayName}
      </Badge>
      <Badge bg='transparent' color='black.900'>
        VS
      </Badge>
      <Badge
        bg={isTeamTwoWinner ? 'green.500' : isTeamOneWinner ? 'alert-red.normal' : 'sand.700'}
        color='black.900'
        px={2}
        transform='skew(-20deg)'
      >
        {teamTwoDisplayName}
      </Badge>
    </Flex>
  )
}