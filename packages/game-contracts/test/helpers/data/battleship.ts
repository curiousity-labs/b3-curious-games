import { Battleship } from "../../../typechain-types"
import { formatMappedStrs } from "../methods/data"

export const shipLocationsOne: string[][] = [
  ["c4", "d4", "e4", "f4", "g4"],
  ["a2", "a3", "a4", "a5"],
  ["a10", "b10", "c10"],
  ["h6", "h7"],
  ["g2"]
]
export const shipLocationsOneBytes = formatMappedStrs(shipLocationsOne).flat()

export const shipLocationsTwo: string[][] = [
  ["j1", "j2", "j3", "j4", "j5"],
  ["b2", "c2", "d2", "e2"],
  ["e5", "e6", "e7"],
  ["c10", "d10"],
  ["a1"]
]
export const shipLocationsTwoBytes = formatMappedStrs(shipLocationsTwo).flat()

export async function fastForwardLastTurnTeamOneLead(signer1C: Battleship, signer2C: Battleship) {
  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[1])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[2])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[3])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[4])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[5])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[6])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[7])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[8])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[9])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[10])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[11])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[12])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[13])

  await signer2C.takeTurn(shipLocationsOneBytes[0])
}

export async function fastForwardLastTurnTeamTwoLead(signer1C: Battleship, signer2C: Battleship) {
  await signer2C.takeTurn(shipLocationsOneBytes[0])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[1])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[2])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[3])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[4])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[5])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[6])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[7])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[8])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[9])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[10])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[11])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[12])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])

  await signer2C.takeTurn(shipLocationsOneBytes[13])
  await signer1C.takeTurn(shipLocationsTwoBytes[0])
  
}

export const ERROR_TEAM_ONE_ONLY = "Team One Only"
export const ERROR_TEAM_TWO_ONLY = "Team Two Only"

export const ERROR_PIECES_SET = "Pieces Set"
export const ERROR_NOT_TURN = "Not your turn"
