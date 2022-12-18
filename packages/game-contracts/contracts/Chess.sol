// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Chess {
  // mapping chess pieces? pos -> Square bytes?
  mapping(bytes => address) public chessBoard;


  // var turn count? 
  uint256 turnCount = 0;

  // event last move
  event PlayerMoveExecuted(uint256 turn, address daoAddress);

  // struct team?
  struct DAOTeam {
    address daoAddress;
    bytes color;
  }

  constructor() {
    
  }

  //  * @param teamOneData data included
  //  * @param teamTwoData data omc;ided
  function startGame() public {

  }
}