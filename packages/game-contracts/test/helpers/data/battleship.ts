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

export const ERROR_TEAM_ONE_ONLY = "Team One Only"
export const ERROR_TEAM_TWO_ONLY = "Team Two Only"

export const ERROR_PIECES_SET = "Pieces Set"
export const ERROR_IS_PLAYING = "Must be Playing"