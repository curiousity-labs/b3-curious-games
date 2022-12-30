
export class Piece {
  constructor(
    public locations: string[],
    public color: string,
    public isPlacedVertically: boolean = false,
    public isHit: boolean = false
  ) { }
}

export class AircraftCarrier extends Piece {
  constructor(color: string, locations: string[]) {
    super(
      locations,
      color
    )
  }
} // length 5
export class Battleship { } // length 4
export class Cruiser { } // length 3
export class Submarine { } // length 2
export class Destroyer { } // length 1
