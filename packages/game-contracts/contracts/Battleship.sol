// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/**
 * @title onchain battleship
 */
contract Battleship {
    /**
     * @notice This will be used to track which addresses are parcipating
     * @param team1 address of team 1
     * @param team2 address of team 2
     */
    event GameCreated(address team1, address team2);


    /**
     * @notice This will keep history of moves taken
     * @notice This should filtered and used by front-end to update hit/misses
     * @param team address of team whose turn was taken
     * @param target target location of attempted hit
     */
    event TurnFinished(address team, bytes target, bool isSuccessful);

    /**
     * @dev Set to 0x0000~ while game is active. game is over when winner is set
     * @notice This should be updated with winner when game is over
     */
    address game_winner = address(0);

    /**
     * 
     */
    address team1 = address(0);

    /**
     * 
     */
    address team2 = address(0);

    /**
     * tracks team one data
     */
    bytes[5][] team_one_ship_locations;
    bytes[5][] team_one_ship_hits;

    /**
     * tracks team two data
     */
    bytes[5][] team_two_ship_locations;
    bytes[5][] team_two_ship_hits;

    /**
     *
     */
    function takeTurn() public {}

    /**
     *
     */
    function forfeitMatch() public {}

    /**
     * sets up game
     */
    constructor(address _team1, address _team2) {
      team1 = _team1;
      team2 = _team2;
      emit GameCreated(_team1, _team2);
    }

    /**
     *
     */
    function playerOneSetPieces() public view {
      require(team1 != address(0) && team1 == msg.sender);
    }

    /**
     *
     */
    function playerTwoSetPieces() public view {
      require(team2 != address(0) && team2 == msg.sender);
    }

    /**
     *
     */
    function gameStart() public {}
}
