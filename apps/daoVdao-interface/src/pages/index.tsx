import { Route, Routes } from 'react-router-dom';
import { Chess } from '../features/Chess';

export function Pages() {
  return (
    <Routes>
      <Route index element={<div /> } />
      <Route path="chess" element={<Chess /> } />
      {/* @todo update route for game number */}
      <Route path="battleship" element={<div /> } />
    </Routes>
  )
}