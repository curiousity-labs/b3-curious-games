export class Piece {
  constructor(
    public currentPos: string | null,
    public team: { color: string }, // Team
    public ShipPortion: { length: number }, // ShipPortion
  ) { }
}