// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract ConnectFour {
    /// @dev revert if caller isn't current team
    error NotYourTurn();
    /// @dev revert if column choice is invalid
    error InvalidSelection();
    /// @dev revert if game has been completed
    error GameOver();
    /// @dev season is over
    error SeasonOver();

    /// @notice emiited when game is created
    event GameCreated(uint gameId, address teamOne, address teamTwo);
    /// @notice emitted after turn is successfully taken
    event TurnTaken(address team, uint column);
    /// @notice emitted when game is complete
    event GameFinished(address winner, uint gameId);

    struct Game {
        address teamOne;
        address teamTwo;
        uint8 turn;
        address winner;
        /// 0 no chip
        /// 1 team one chip
        /// 2 team two chip
        uint8[6][6] board;
    }

    /// @notice holds the initial board information
    /// @dev set during deployment ~see constructor
    uint8[6][6] internal initialBoard;

    /// @notice Used as a counter for the next game index.
    /// @dev Initialised at 1 because it makes the first transaction slightly cheaper.
    uint internal gameId = 1;

    /// @notice An indexed list of games
    /// @dev This automatically generates a getter for us, which will return `Game.player1`, `Game.player2`, `Game.moves`, and `Game.finished` (the arrays are skipped)
    mapping(uint => Game) public getGame;

    /// @notice check if choice is out of bounds
    modifier validColumn(uint8 column) {
        if (column >= 6) revert InvalidSelection();
        _;
    }

    /// @notice check if specific game is over
    modifier gameOver(uint8 _gameId) {
        if (getGame[_gameId].winner != address(0)) revert GameOver();
        _;
    }

    /// @notice check if season is over. (coming soon)
    modifier seasonOver() {
        _;
    }

    modifier uniqueTeams(address opponent) {
        require(msg.sender != opponent);
        _;
    }

    /**
     * @notice method to call to create a new game
     * @dev team assigned to two will go first
     * @dev game id is increated each time a new game is created
     * @dev season is over when timer (soon to be added) is past
     * @param opponent challened
     */
    function challenge(
        address opponent
    ) public uniqueTeams(opponent) returns (uint) {
        Game memory newGame = Game(
            msg.sender,
            opponent,
            uint8(0),
            address(0),
            initialBoard
        );

        getGame[gameId] = newGame;

        emit GameCreated(gameId, msg.sender, opponent);

        return gameId++;
    }

    /**
     * @dev modifer: gameOver
     * @dev modifer: validColumn
     * @dev modifer: seasonOver (coming soon)
     * @dev modifer: didPlayerWin
     * @param _gameId id of game
     * @param column selected column for move
     */
    function makeMove(
        uint8 _gameId,
        uint8 column
    ) external gameOver(_gameId) validColumn(column) {
        Game storage game = getGame[_gameId];
        uint8 row;
        uint8 teamNum = game.turn & 1 == 0 ? 2 : 1;
        /// @notice restricts to only address of team whose turn it is
        /// @dev even or odd bitwise operator decides turn
        /// @dev starts with team two
        if (msg.sender != (game.turn & 1 == 0 ? game.teamTwo : game.teamOne)) {
            revert NotYourTurn();
        }

        /// find bottom of selected column
        for (uint8 i = 0; i < 6; i++) {
            uint8 square = game.board[column][i];
            if (square == 0) {
                row = i++;
                break;
            }
        }

        game.board[column][row] = teamNum;
        game.turn++;
        emit TurnTaken(msg.sender, column);

        if (didPlayerWin(_gameId, column, row, teamNum)) {
            game.winner = msg.sender;
            emit GameFinished(msg.sender, _gameId);
        }
    }

    function checkSquare(
        uint8[6][6] storage board,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) internal view returns (bool) {
        return board[column][row] == teamNum;
    }

    /// @notice checks the direction for team state
    function checkHorizonalWin(
        uint8[6][6] storage board,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) internal view returns (uint8) {
        uint8 connectedPiecesCount = 1;
        /// @dev checks to the right of new piece
        for (uint8 i = column + 1; i < 6 - column; i++) {
            if (checkSquare(board, i, row, teamNum)) {
                connectedPiecesCount++;
            } else {
                break;
            }
        }
        /// @dev checks to the left of new piece
        if (column != 0) {
            uint8 columnIndex = column - 1;
            while (columnIndex >= 0) {
                if (checkSquare(board, columnIndex, row, teamNum)) {
                    connectedPiecesCount++;
                } else {
                    break;
                }
                if (columnIndex == 0) {
                    break;
                } else {
                    columnIndex--;
                }
            }
        }
        return connectedPiecesCount;
    }

    function checkVericalWin(
        uint8[6][6] storage board,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) internal view returns (uint8) {
        uint8 connectedPiecesCount = 1;
        /// @dev checks rows above new piece
        for (uint8 i = row + 1; i < 6 - row; i++) {
            if (checkSquare(board, column, i, teamNum)) {
                connectedPiecesCount++;
            } else {
                break;
            }
        }
        /// @dev checks rows below new piece
        if (row != 0) {
            uint8 rowIndex = row - 1;
            while (rowIndex >= 0) {
                if (checkSquare(board, column, rowIndex, teamNum)) {
                    connectedPiecesCount++;
                } else {
                    break;
                }
                if (rowIndex == 0) {
                    break;
                } else {
                    rowIndex--;
                }
            }
        }
        return connectedPiecesCount;
    }

    function checkForwardAngleWin(
        uint8[6][6] storage board,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) internal view returns (uint8) {
        uint8 connectedPiecesCount = 1;
        /// @dev checks forward angle up
        for (uint8 i = row + 1; i < 6 - row; i++) {
            if (checkSquare(board, i, i, teamNum)) {
                connectedPiecesCount++;
            } else {
                break;
            }
        }
        /// @dev checks forward angle down
        if (row != 0 && column != 0) {
            uint8 rowIndex = row - 1;
            uint8 columnIndex = column - 1;
            while (rowIndex >= 0 || columnIndex >= 0) {
                if (checkSquare(board, columnIndex, rowIndex, teamNum)) {
                    connectedPiecesCount++;
                } else {
                    break;
                }
                if (rowIndex == 0 || columnIndex == 0) {
                    break;
                } else {
                    rowIndex--;
                    columnIndex--;
                }
            }
        }
        return connectedPiecesCount;
    }

    function checkBackwardAngleWin(
        uint8[6][6] storage board,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) internal view returns (uint8) {
        uint8 connectedPiecesCount = 1;
        /// @dev checks backward angle down
        if (row != 0 && column != 0) {
            uint8 rowIndex = row - 1;
            uint8 columnIndex = column + 1;
            while (rowIndex >= 0 || columnIndex < 7) {
                if (checkSquare(board, columnIndex, rowIndex, teamNum)) {
                    connectedPiecesCount++;
                } else {
                    break;
                }
                if (rowIndex == 0 || columnIndex > 6) {
                    break;
                } else {
                    rowIndex--;
                    columnIndex++;
                }
            }
        }
        /// @dev checks forward angle down
        if (row != 0 && column != 0) {
            uint8 rowIndex = row + 1;
            uint8 columnIndex = column - 1;
            while (rowIndex < 7 || columnIndex >= 0) {
                if (checkSquare(board, columnIndex, rowIndex, teamNum)) {
                    connectedPiecesCount++;
                } else {
                    break;
                }
                if (rowIndex > 6 || columnIndex == 0) {
                    break;
                } else {
                    rowIndex++;
                    columnIndex--;
                }
            }
        }
        return connectedPiecesCount;
    }

    /// @notice checks to see if there is a winning player
    function didPlayerWin(
        uint8 _gameId,
        uint8 column,
        uint8 row,
        uint8 teamNum
    ) public view returns (bool) {
        uint8[6][6] storage board = getGame[_gameId].board;
        /// using new chip location as middle == m
        /// [ [ C+1 | R-1 ] [  C+1  ] [ C+1 | R+1 ] ]
        /// [ [    R-1    ] [ C | R ] [    R+1    ]
        /// [ [ C-1 | R-1 ] [  C-1  ] [ C-1 | R+1 ] ]

        uint8 horionalCount = checkHorizonalWin(board, column, row, teamNum);
        if (horionalCount == 4) {
            return true;
        }
        uint8 vericalCount = checkVericalWin(board, column, row, teamNum);
        if (vericalCount == 4) {
            return true;
        }
        uint8 forwardAngleCount = checkForwardAngleWin(
            board,
            column,
            row,
            teamNum
        );
        if (forwardAngleCount == 4) {
            return true;
        }
        uint8 backwardAngleCount = checkBackwardAngleWin(
            board,
            column,
            row,
            teamNum
        );
        if (backwardAngleCount == 4) {
            return true;
        }
        return false;
    }

    function getGameBoard(
        uint _gameId
    ) public view returns (uint8[6][6] memory) {
        return getGame[_gameId].board;
    }
}
