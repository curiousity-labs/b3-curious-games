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
     *
     */
    function initilizeGame() public {}

    /**
     *
     */
    function playerOneSetPieces() public {}

    /**
     *
     */
    function playerTwoSetPieces() public {}

    /**
     *
     */
    function gameStart() public {}
}
