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

    address public team1 = address(0);
    address public team2 = address(0);

    /**
     * unit8 0 | undefined: nothing
     * unit8 1 : ship
     * unit8 2 : hit
     */
    mapping(address => mapping(bytes4 => uint8)) ships;
    mapping(address => bool) teamReady;
    mapping(address => uint8) hits;

    /**
     * initilizes game between two addresses
     */
    // @todo create factory contract
    constructor(address _team2) {
        team1 = msg.sender;
        team2 = _team2;
        emit GameCreated(team1, team2);
    }

    function checkAndSetPieces(
        bytes4[15] memory targets,
        address team
    ) private {
        for (uint256 i; i < targets.length; i++) {
            ships[team][targets[i]] = 1;
        }
        teamReady[team] = true;
        emit TeamReady(team);
    }

    modifier piecesSet() {
        require(teamReady[msg.sender] == false, "Pieces Set");
        _;
    }

    /**
     *
     */
    function setTeamOnePieces(bytes4[15] memory targets) external piecesSet {
        require(msg.sender == team1, "Team One Only");
        checkAndSetPieces(targets, msg.sender);
    }

    /**
     *
     */
    function setTeamTwoPieces(bytes4[15] memory targets) external piecesSet {
        require(msg.sender == team2, "Team Two Only");
        checkAndSetPieces(targets, msg.sender);
    }

    /**
     *
     */
    // function forfeitMatch() public {}
}
