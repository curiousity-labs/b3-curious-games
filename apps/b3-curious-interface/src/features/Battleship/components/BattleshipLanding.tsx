import { Box } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'
import { useLoadGames } from '../hooks/useLoadGames'
import { BattleshipTable } from './BattleshipTable'

export function BattleshipLanding() {
  const navigate = useNavigate()
  const [games, isGamesLoading] = useLoadGames()
  if (isGamesLoading) {
    return (
      // @todo create page loader
      <div></div>
    )
  }
  return (
    <Box px={4}>
      <PageTitle
        title='Battleship'
        buttons={[
          {
            label: 'New Game',
            onClick: () => navigate(ROUTES.battleshipNew.relative()),
          },
        ]}
      />
      <BattleshipTable games={games} />
    </Box >
  )
}
