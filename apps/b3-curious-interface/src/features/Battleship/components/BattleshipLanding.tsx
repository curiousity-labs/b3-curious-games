import { Box, Flex } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'
import { useLoadGames } from '../hooks/useLoadGames'
import { BattleshipCard } from './BattleshipCard'

export function BattleshipLanding() {
  const navigate = useNavigate()
  const { games } = useLoadGames()
  return (
    <Box>
      <PageTitle
        title='Battleship'
        buttons={[
          {
            label: 'New Game',
            onClick: () => navigate(ROUTES.battleshipNew.relative()),
          },
        ]}
      />
      <Flex flexWrap="wrap" gap={4} justifyContent="space-between">
        {!!games.length && games.map((game, i) => (
          <BattleshipCard game={game} key={i} />
        ))}
      </Flex>
      {/* List of active games and stats? */}

      {/* banner with recent games? */}
    </Box >
  )
}
