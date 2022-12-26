import { Route, Routes } from 'react-router-dom';
import { Battleship } from '../features/Battleship';
import { Landing } from '../components/Landing';
import { ROUTES } from './routes';

export function Pages() {
  return (
    <Routes>
      <Route index element={<Landing /> } />
      <Route path={ROUTES.battleshipLanding.path} >
        <Route index element={<div />} />
        <Route path={ROUTES.battleshipNew.path} element={<div />} />
        <Route path={ROUTES.battleshipGame.path} element={<Battleship />} />
      </Route>
    </Routes>
  )
}