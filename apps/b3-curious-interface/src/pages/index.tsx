import { Route, Routes } from 'react-router-dom'
import { Battleship } from '../features/Battleship'
import { Landing } from '../components/pages/Landing'
import { ROUTES } from './routes'
import { BattleshipLanding } from '../features/Battleship/components/BattleshipLanding'
import { BattleshipNewGame } from '../features/Battleship/components/BattleshipNewGame'
import { BattleshipProvider } from '../features/Battleship/provider/BattleshipProvider'
import { ConnectFour } from '../features/ConnectFour'

export function Pages() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path={ROUTES.connect4.path} element={<ConnectFour />} />
      <Route path={ROUTES.battleshipLanding.path}>
        <Route index element={<BattleshipLanding />} />
        <Route path={ROUTES.battleshipNew.path} element={<BattleshipNewGame />} />
        <Route
          path={ROUTES.battleshipGame.path}
          element={<BattleshipProvider component={<Battleship />} />}
        />
      </Route>
    </Routes>
  )
}
