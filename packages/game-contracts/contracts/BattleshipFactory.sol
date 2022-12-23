// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BattleshipImpl.sol";

contract BattleshipFactory is Ownable {
    mapping(uint => Battleship) BattleshipGames;
    uint gameId;

    address public battleshipImplAddr;

    function deployAndChallange(address teamtwo) external {
        Battleship newGame = Battleship(Clones.clone(battleshipImplAddr));

        newGame.init(msg.sender, teamtwo);

        BattleshipGames[gameId] = newGame;

        gameId = ++gameId;
    }

    constructor(address implAddress) {
        battleshipImplAddr = implAddress;
    }

    function getGames() public view returns (Battleship[] memory) {
        Battleship[] memory games = new Battleship[](gameId);
        for (uint i = 0; i < gameId; i++) {
            games[i] = BattleshipGames[i];
        }
        return games;
    }

    function getGame(uint _gameId) public view returns (Battleship) {
        return BattleshipGames[_gameId];
    }
}
