// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract ConnectFour {
    /// Error: Not Your Turn
    error NotYourTurn();
    /// Error: Invalid Selection
    error InvalidSelection();
    /// Error: Game is over
    error GameOver();

    /// Event: Turn Taken
    event TurnTaken(address team, uint col, uint row);
    /// Event: Game Finished
    event GameFinished(address winnder);

    address public game_winner = address(0);
    address public teamOne = address(0);
    address public teamTwo = address(0);
    address public currentTurn = address(0);

    struct Square {
        /// 0 no chip
        /// 1 team one chip
        /// 2 team two chip
        /// 3 out off bounds
        uint8 state;
    }

    mapping(uint => mapping(uint => Square)) public board;

    /// modifer check that its current team's turn
    modifier checkTurn() {
        if (currentTurn == address(0)) {
            _;
        }
        if (msg.sender == currentTurn) revert NotYourTurn();
        _;
    }

    /// modifier restrict column choices to valid columns
    modifier restrictCol(uint col) {
        if (col > 0 && col < 7) revert InvalidSelection();
        _;
    }

    /// modifer game over
    modifier gameOver() {
        if (game_winner != address(0)) revert GameOver();
        _;
    }

    /// private function check board
    /// @param col column selected by team
    /// @param row row where chip landed
    /// @param count number of connect pieces
    /// @param currentTeamNum team number for state state
    /// @param direction direction currently looking connecting chips
    function checkSquare(
        uint col,
        uint row,
        uint count,
        uint8 currentTeamNum,
        uint8 direction
    ) private returns (uint) {
        /// using new chip location as middle == m
        /// [ [ C+1 | R-1 ] [  C+1  ] [ C+1 | R+1 ] ]
        /// [ [    R-1    ] [ C | R ] [    R+1    ]
        /// [ [ C-1 | R-1 ] [  C-1  ] [ C-1 | R+1 ] ]
        Square memory square = board[col][row];
        if (square.state == currentTeamNum) {
            if (direction == 0) {
                checkSquare(col++, row--, count++, currentTeamNum, direction);
            }
            if (direction == 1) {
                checkSquare(col++, row, count++, currentTeamNum, direction);
            }
            if (direction == 2) {
                checkSquare(col++, row++, count++, currentTeamNum, direction);
            }
            if (direction == 3) {
                checkSquare(col, row--, count++, currentTeamNum, direction);
            }
            /// direction will never be 4, we are not playing 3D connect 4..although...
            if (direction == 5) {
                checkSquare(col, row++, count++, currentTeamNum, direction);
            }
            if (direction == 6) {
                checkSquare(col--, row--, count++, currentTeamNum, direction);
            }
            if (direction == 7) {
                checkSquare(col--, row, count++, currentTeamNum, direction);
            }
            if (direction == 8) {
                checkSquare(col--, row++, count++, currentTeamNum, direction);
            }
        }
        return count;
    }

    /// external function play turn
    function playTurn(uint col) external gameOver restrictCol(col) checkTurn {
        uint row;
        uint8 currentTeamNum = teamOne == currentTurn ? 1 : 2;

        /// find square with heightest empty spot; add chip
        /// find hightest filled point from 1 - 7
        for (uint i = 1; i <= 7; i++) {
            Square memory square = board[col][i];
            /// square found: add piece to board
            if (square.state == 0) {
                row = i;
                break;
            }
            /// drop invalid; chip falls out of bounds
            if (square.state == 7) revert InvalidSelection();
        }
        board[col][row] = Square(currentTeamNum);

        /// check board for four in a row
        uint[4] memory directionalCounts = [
            checkSquare(col, row, 1, currentTeamNum, 0) +
                checkSquare(col, row, 1, currentTeamNum, 8),
            checkSquare(col, row, 1, currentTeamNum, 1) +
                checkSquare(col, row, 1, currentTeamNum, 7),
            checkSquare(col, row, 1, currentTeamNum, 6) +
                checkSquare(col, row, 1, currentTeamNum, 2),
            checkSquare(col, row, 1, currentTeamNum, 6) +
                checkSquare(col, row, 1, currentTeamNum, 2)
        ];

        for (uint i = 0; i < directionalCounts.length; i++) {
            if (directionalCounts[i] == 4) {
                game_winner = msg.sender;
                emit GameFinished(msg.sender);
                return;
            }
        }

        currentTurn = msg.sender == teamOne ? teamTwo : teamOne;
        emit TurnTaken(msg.sender, col, row);
    }

    function init(address _teamOne, address _teamTwo) public {
        teamOne = _teamOne;
        teamTwo = _teamTwo;
    }
}
