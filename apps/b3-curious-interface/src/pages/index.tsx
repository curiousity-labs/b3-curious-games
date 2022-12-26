import { Route, Routes } from 'react-router-dom';
import { Chess } from '../features/Chess';
import { Battleship } from '../features/Battleship';
import { Landing } from '../components/Landing';

export function Pages() {
  return (
    <Routes>
      <Route index element={<Landing /> } />
      <Route path="chess" element={<Chess /> } />
      {/* @todo update route for game number */}
      <Route path="battleship" element={<Battleship /> } />
    </Routes>
  )
}