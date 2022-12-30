
export class Piece {
  constructor(
    public locations: string[],
    public color: string,
    public isPlacedVertically: boolean = false,
    public isHit: boolean = false
  ) { }
}
