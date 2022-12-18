import { Team } from './types'
import { Bishop, King, Knight, Pawn, Queen, Rook } from './models'

export const team: Team = {
  color: 'black.900',
  name: 'Decent DAO',
  isFirst: true,
}

export const mockTeamOnePieces = [
  new King(team, 'd1'), 
  new Queen(team, 'e1'),
  new Knight(team, 'b1'),
  new Knight(team, 'g1'),
  new Bishop(team, 'c1'),
  new Bishop(team, 'f1'),
  new Rook(team, 'a1'),
  new Rook(team, 'h1'),

  new Pawn(team, 'd2'), 
  new Pawn(team, 'e2'),
  new Pawn(team, 'b2'),
  new Pawn(team, 'g2'),
  new Pawn(team, 'c2'),
  new Pawn(team, 'f2'),
  new Pawn(team, 'a2'),
  new Pawn(team, 'h2'),
]

const teamTwo: Team = {
  color: 'grayscale.white',
  name: 'Fractal DAO',
  isFirst: true,
}

export const mockTeamTwoPieces = [
  new King(teamTwo, 'd8'), 
  new Queen(teamTwo, 'e8'),
  new Knight(teamTwo, 'b8'),
  new Knight(teamTwo, 'g8'),
  new Bishop(teamTwo, 'c8'),
  new Bishop(teamTwo, 'f8'),
  new Rook(teamTwo, 'a8'),
  new Rook(teamTwo, 'h8'),

  new Pawn(teamTwo, 'd7'), 
  new Pawn(teamTwo, 'e7'),
  new Pawn(teamTwo, 'b7'),
  new Pawn(teamTwo, 'g7'),
  new Pawn(teamTwo, 'c7'),
  new Pawn(teamTwo, 'f7'),
  new Pawn(teamTwo, 'a7'),
  new Pawn(teamTwo, 'h7'),
]

