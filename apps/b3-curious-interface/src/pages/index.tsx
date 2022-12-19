import { Route, Routes } from 'react-router-dom';
import { Chess } from '../features/Chess';
import { Battleship } from '../features/Battleship';

export function Pages() {
  return (
    <Routes>
      <Route index element={<div /> } />
      <Route path="chess" element={<Chess /> } />
      {/* @todo update route for game number */}
      <Route path="battleship" element={<Battleship /> } />
    </Routes>
  )
}