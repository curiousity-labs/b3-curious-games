// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract ConnectFour {
    /// @dev revert if challenged called after game has started
    error GameAlreadyStarted();
    /// @dev revert if caller isn't current team
    error NotYourTurn();
    /// @dev revert if column choice is invalid
    error InvalidSelection();
    /// @dev revert if game has been completed
    error GameOver();

    /// @notice emitted after turn is successfully taken
    event TurnTaken(address team, uint column);
    /// @notice emitted when game is complete
    event GameFinished(address winner);

    /// @dev Parameters for game
    /// @param teamOne The address of the first player
    /// @param teamTwo The address of the second player
    /// @param height A helper, used to track which position to assign to pieces for each row
    /// @param board Two bitboards (one for each player), each representing a 7x6 board with an extra column at the top to check for invalid moves.
    /// @param moves A counter of the amount of moves so far
    /// @param finished Wether the game has been won
    struct Game {
        address teamOne;
        address teamTwo;
        uint64[7] height;
        uint64[2] board;
        uint8 moves;
        bool finished;
    }

    /// @notice The initial value of `Game.height`, representing the indexes of the bottom column of the 7x6(+1) board
    /// @dev Solidity doesn't support array immutable variables or constants yet, so we're forced to compute this at runtime (see constructor).
    uint64[7] internal initialHeight;

    /// @notice The indexes of the helper top column of the 7x6(+1) board
    uint64 internal constant topColumn = 283691315109952;

    /// @notice holds contract game struct
    Game game;

    /// @notice Deploys a ConnectFour instance
    /// @dev Used to compute the value of `initialHeight`, since we cannot make it a constant (or immutable).
    constructor() payable {
        unchecked {
			for (uint8 i = 0; i < 7; i++) {
				initialHeight[i] = uint64(7 * i);
			}
		}
    }

    /// @notice Challenge another address to a game of connect four
    /// @param _teamOne address of opponent
    /// @param _teamTwo address of challenger
    function challenge(address _teamOne, address _teamTwo) public payable {
        if (game.teamOne != address(0)) revert GameAlreadyStarted();
        game = Game({
            teamOne: _teamOne,
            teamTwo: _teamTwo,
            height: initialHeight,
            board: [uint64(0), uint64(0)],
            moves: 0,
            finished: false
        });
    }

    /// @notice Perform a move on an active game
    /// @param column The row on where you want to drop your piece
    function makeMove(uint8 column) public payable {

        /// @dev even or odd bitwise operator decides turn
        /// @dev starts with team two
        if (
            msg.sender != (game.moves & 1 == 0 ? game.teamOne : game.teamTwo)
        ) revert NotYourTurn();
        if (game.finished) revert GameOver();

        emit TurnTaken(msg.sender, column);

        /// @dev left side finds current team's board
        /// @dev ^= calls ^ operator and reassigns new chip to team's board
        /// @dev right side adds chip in correct place by left shifting row bits into correct placement
        game.board[game.moves & 1] ^= uint64(1) << game.height[column]++;

        if ((game.board[game.moves & 1] & topColumn) != 0) {
            revert InvalidSelection();
        }
        if (didPlayerWin(game.moves++ & 1)) {
            game.finished = true;
            emit GameFinished(msg.sender);
        }
    }

    /// @notice Check wether one of the players for a certain game has won the match
    /// @param side Which side of the board you want to check (0 or 1).
    function didPlayerWin(uint8 side) public view returns (bool) {
        uint64 board = game.board[side];
        uint8[4] memory directions = [1, 7, 6, 8];

        uint64 bb;

        unchecked {
            for (uint8 i = 0; i < 4; i++) {
                bb = board & (board >> directions[i]);
                if ((bb & (bb >> (directions[i] << 1))) != 0) return true;
            }
        }

        return false;
    }

    function getBoards() public view returns (uint64, uint64) {
        uint64[2] memory boards = game.board;

        return (boards[0], boards[1]);
    }
}
