// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

/**
 * @title onchain battleship
 */
contract BattleshipImpl {
    event GameCreated(address team1, address team2);
    event TeamReady(address team);
    event TurnFinished(address team, bytes4 target, bool isSuccessful);
    event GameFinished(address winner);

    address public game_winner = address(0);
    address public team1 = address(0);
    address public team2 = address(0);
    address public currentTurn = address(0);

    struct Turn {
        bytes4 location;
        uint8 operation;
    }

    struct TeamHits {
        uint8 hitCount;
        uint8 turnNum;
        mapping(uint8 => Turn) turnStats;
        mapping(bytes4 => uint8) targeted;
    }

    modifier piecesSet() {
        require(teamReady[msg.sender] == false, "Pieces Set");
        _;
    }

    modifier gameOver() {
        require(game_winner == address(0), "Game is Over");
        _;
    }

    modifier checkTurn() {
        if ((currentTurn == address(0) && msg.sender == team2)) {
            _;
            return;
        }
        require(currentTurn == msg.sender, "Not your turn");
        _;
    }

    mapping(address => mapping(bytes4 => uint8)) private locations;
    mapping(address => TeamHits) teamHits;
    mapping(address => bool) private teamReady;

    function checkAndSetPieces(
        bytes4[15] memory targets,
        address team
    ) private {
        for (uint256 i; i < targets.length; i++) {
            locations[team][targets[i]] = 1;
        }
        teamReady[team] = true;
        emit TeamReady(team);
    }

    function setTeamOnePieces(bytes4[15] memory targets) external piecesSet {
        require(msg.sender == team1, "Team One Only");
        checkAndSetPieces(targets, msg.sender);
    }

    function setTeamTwoPieces(bytes4[15] memory targets) external piecesSet {
        require(msg.sender == team2, "Team Two Only");
        checkAndSetPieces(targets, msg.sender);
    }

    function targetSpot(bytes4 target, address defTeam) private gameOver {
        if (
            locations[defTeam][target] == 1 &&
            teamHits[msg.sender].targeted[target] == 0
        ) {
            uint8 raisedHit = ++teamHits[msg.sender].hitCount;
            teamHits[msg.sender].hitCount = raisedHit;
            teamHits[msg.sender].targeted[target] = 1;
            if (raisedHit == 15) {
                game_winner = msg.sender;
                emit GameFinished(msg.sender);
            } else {
                emit TurnFinished(msg.sender, target, true);
            }
        } else {
            emit TurnFinished(msg.sender, target, false);
        }

        currentTurn = defTeam;
    }

    function takeTurn(bytes4 target) external checkTurn {
        if (msg.sender == team1) {
            targetSpot(target, team2);
        } else {
            targetSpot(target, team1);
        }
    }

    function init(address _team1, address _team2) public {
        team1 = _team1;
        team2 = _team2;
        emit GameCreated(team1, team2);
    }
}
