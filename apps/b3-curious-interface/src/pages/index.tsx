import { Route, Routes } from 'react-router-dom'
import { Battleship } from '../features/Battleship'
import { Landing } from '../components/Landing'
import { ROUTES } from './routes'
import { BattleshipLanding } from '../features/Battleship/components/Landing'
import { NewGame } from '../features/Battleship/components/NewGame'
import { BattleshipProvider } from '../features/Battleship/provider/BattleshipProvider'

export function Pages() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path={ROUTES.battleshipLanding.path}>
        <Route index element={<BattleshipLanding />} />
        <Route path={ROUTES.battleshipNew.path} element={<NewGame />} />
        <Route
          path={ROUTES.battleshipGame.path}
          element={<BattleshipProvider component={<Battleship />} />}
        />
      </Route>
    </Routes>
  )
}
