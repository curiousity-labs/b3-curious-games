export interface IAccountState {
  // load address info
  // address: Address

  // DAOs member info (local storage)
  // memberDAO: []

  // vistied games (local storage) (expires)
  // visited: []

  // partcipatedGames (local storage + blockchain) (expires /a complete)
  // partcipated: []

  // wins (partcipated games + blockchain)
  // wins: 0

  // loses (partcipated games + blockchain)
  // loses: 0

  // loading
  isAccountConnected: boolean;
}