import { BSTeam, ShipRange } from './types';

export class Piece {
  constructor(
    public currentPos: ShipRange | null,
    public team: { color: string },
    public isPlacedVertically: boolean = false
  ) { }
}

export class AircraftCarrier extends Piece {
  constructor(team: BSTeam, currentPos: ShipRange | null) {
    super(
      currentPos, 
      { color: '' }
    )
  }
} // length 5
export class Battleship {} // length 4
export class Cruiser {} // length 3
export class Submarine {} // length 2
export class Destroyer {} // length 1
