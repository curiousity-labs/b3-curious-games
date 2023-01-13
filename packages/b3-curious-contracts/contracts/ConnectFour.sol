// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract ConnectFour {
    /// @dev revert if caller isn't current team
    error NotYourTurn();
    /// @dev revert if column choice is invalid
    error InvalidSelection();
    /// @dev revert if game has been completed
    error GameOver();
    /// @dev season is over
    error SeasonOver();

    /// @notice emitted after turn is successfully taken
    event moveTaken(address team, uint column);
    /// @notice emitted when game is complete
    event GameFinished(address winner);
    struct Game {
        address teamOne;
        address teamTwo;
        uint8 turn;
        address winner;
        /// 0 no chip
        /// 1 team one chip
        /// 2 team two chip
        uint8[6][7] board;
    }

    /// @notice holds the initial board information
    /// @dev set during deployment ~see constructor
    uint8[6][7] initialBoard;

    /// @notice Used as a counter for the next game index.
    /// @dev Initialised at 1 because it makes the first transaction slightly cheaper.
    uint internal gameId = 1;

    /// @notice An indexed list of games
    /// @dev This automatically generates a getter for us, which will return `Game.player1`, `Game.player2`, `Game.moves`, and `Game.finished` (the arrays are skipped)
    mapping(uint => Game) public getGame;

    /// @dev initializes an empty board that will be used during creation of each game
    /// @dev with top row being
    /// @dev 3 3 3 3 3 3
    /// @dev 0 0 0 0 0 0
    /// @dev 0 0 0 0 0 0
    /// @dev 0 0 0 0 0 0
    /// @dev 0 0 0 0 0 0
    /// @dev 0 0 0 0 0 0
    constructor() {
        uint8[6] memory invalidRow = [3, 3, 3, 3, 3, 3];
        uint8[6] memory initialRows = [0, 0, 0, 0, 0, 0];

        initialBoard = [
            invalidRow,
            initialRows,
            initialRows,
            initialRows,
            initialRows,
            initialRows,
            initialRows
        ];
    }

    function challenge(
        address _teamOne,
        address _teamTwo
    ) public returns (uint) {
        Game memory newGame = Game(
            _teamOne,
            _teamTwo,
            uint8(0),
            address(0),
            initialBoard
        );
        getGame[gameId] = newGame;

        return gameId++;
    }

    // /// modifer check that its current team's turn
    // modifier checkTurn() {}

    // /// modifier restrict column choices to valid columns
    // modifier restrictCol(uint col) {

    // }

    // /// modifer game over
    // modifier gameOver() {

    // }

    //     /// using new chip location as middle == m
    //     /// [ [ C+1 | R-1 ] [  C+1  ] [ C+1 | R+1 ] ]
    //     /// [ [    R-1    ] [ C | R ] [    R+1    ]
    //     /// [ [ C-1 | R-1 ] [  C-1  ] [ C-1 | R+1 ] ]
}
