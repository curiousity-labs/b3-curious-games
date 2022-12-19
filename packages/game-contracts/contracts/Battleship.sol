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

    bytes2[][] private team_one_ship_locations;
    bytes2[] team_one_targets;

    bytes2[][] private team_two_ship_locations;
    bytes2[] team_two_targets;

    modifier turnCheck() {
        if(
            msg.sender != team2 && team_two_targets.length == 0
        ) {
          revert("Team 2 first");
        }
        if (
            msg.sender == team2 &&
            team_two_targets.length != team_one_targets.length
        ) {
            revert("Not your turn Team 2");
        }
        if (
            msg.sender == team1 &&
            team_two_targets.length == team_one_targets.length
        ) {
            revert("Not your turn Team 1");
        }
        _;
    }

    /**
     *
     */
    function takeTurn(bytes2 target) external turnCheck {
        require(msg.sender == team1 || msg.sender == team2, "Your not playing");
        if (msg.sender == team1) {
            bool hasTargeted = false;
            for (uint256 i = 0; i < team_one_targets.length; i++) {
                if (team_one_targets[i] == target) {
                    hasTargeted = true;
                }
            }
            team_one_targets.push(target);
        } else {
            team_two_targets.push(target);
        }
    }

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

    modifier teamOneSet() {
        require(team_one_ship_locations.length == 0, "Pieces already set");
        _;
    }

    /**
     *
     */
    modifier checkPieces(bytes2[][] memory targets) {
        bool isPiecesValid = true;
        for (uint256 i = 0; i < targets.length; i++) {
            if (targets[i].length == targets.length + 1) {
                isPiecesValid = false;
                break;
            }
        }
        require(isPiecesValid, "Incorrect pieces");
        _;
    }

    /**
     *
     */
    function setTeamOnePieces(
        bytes2[][] memory targets
    ) external teamOneSet checkPieces(targets) {
        require(msg.sender == team1, "Team One Only");
        team_one_ship_locations = targets;
        emit TeamReady(msg.sender);
    }

    modifier teamTwoSet() {
        require(team_two_ship_locations.length == 0, "Pieces already set");
        _;
    }

    /**
     *
     */
    function setTeamTwoPieces(
        bytes2[][] memory targets
    ) external teamTwoSet checkPieces(targets) {
        require(msg.sender == team2, "Team Two Only");
        team_two_ship_locations = targets;
        emit TeamReady(team2);
    }

    /**
     *
     */
    function gameStart() public {}
}
