// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Battleship.sol";

contract BattleshipFactory {
    event GameCreated(address gameAddress, address teamOne, address teamTwo);

    uint private gameId;
    address private BattleshipAddr;

    // gameId -> contract implementation
    mapping(uint => Battleship) BattleshipGames;

    modifier uniqueTeams(address teamTwo) {
        require(msg.sender != teamTwo);
        _;
    }

    function deployAndChallange(address teamTwo) external uniqueTeams(teamTwo) {
        Battleship newGame = Battleship(
            Clones.clone(BattleshipAddr)
        );
        newGame.init(msg.sender, teamTwo);
        BattleshipGames[gameId] = newGame;
        gameId = ++gameId;
        emit GameCreated(address(newGame), msg.sender, teamTwo);
    }

    constructor(address implAddress) {
        BattleshipAddr = implAddress;
    }

    function getGames() public view returns (Battleship[] memory) {
        Battleship[] memory games = new Battleship[](gameId);
        for (uint i = 0; i < gameId; i++) {
            games[i] = BattleshipGames[i];
        }
        return games;
    }
}
