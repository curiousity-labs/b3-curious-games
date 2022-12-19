// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

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
     * @notice This event will only event fire twice per contract, when 2 events have been fired game can begin
     * @param team address of team 1
     */
    event TeamReady(address team);

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
    address public team1 = address(0);

    /**
     *
     */
    address public team2 = address(0);

    /**
     * tracks team one data
     */
    string[][] private team_one_ship_locations;
    string[][] team_one_ship_hits;

    /**
     * tracks team two data
     */
    string[][] private team_two_ship_locations;
    string[][] team_two_ship_hits;

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
    constructor(address _team2) {
        team1 = msg.sender;
        team2 = _team2;
        emit GameCreated(team1, team2);
    }

    /**
     *
     */
    modifier checkPieces(string[][] memory targets) {
        require(targets.length == 5, "Must have 5 pieces");
        bool isPiecesSet = true;
        for (uint256 i = 0; i < targets.length; i++) {
            if (targets[i].length == targets.length + 1) {
                isPiecesSet = false;
            }
        }
        require(isPiecesSet, "Incorrect pieces");
        _;
    }

    /**
     *
     */
    function setTeamOnePieces(
        string[][] memory targets
    ) external checkPieces(targets) {
        require(team_one_ship_locations.length == 0, "Pieces already set");
        require(msg.sender == team1, "Team One Only");
        team_one_ship_locations = targets;
        emit TeamReady(msg.sender);
    }

    /**
     *
     */
    function setTeamTwoPieces(
        string[][] memory targets
    ) external checkPieces(targets) {
        require(team_two_ship_locations.length == 0, "Pieces already set");
        require(msg.sender == team2, "Team Two Only");
        team_two_ship_locations = targets;
        emit TeamReady(team2);
    }

    /**
     *
     */
    function gameStart() public {}
}
