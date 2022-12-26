import { Box } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'

export function BattleshipLanding() {
  const navigate = useNavigate()
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
      {/* List of active games and stats? */}
      {/* banner with recent games? */}
    </Box>
  )
}
