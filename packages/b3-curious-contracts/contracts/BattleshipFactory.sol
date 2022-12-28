// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./BattleshipImpl.sol";

contract BattleshipFactory {
    event GameCreated(address gameAddress, uint gameId);
    mapping(uint => BattleshipImpl) BattleshipGames;
    uint public gameId;

    address public battleshipImplAddr;

    function deployAndChallange(address teamtwo) external {
        BattleshipImpl newGame = BattleshipImpl(
            Clones.clone(battleshipImplAddr)
        );

        newGame.init(msg.sender, teamtwo);

        BattleshipGames[gameId] = newGame;

        gameId = ++gameId;
        emit GameCreated(address(newGame), gameId);
    }

    constructor(address implAddress) {
        battleshipImplAddr = implAddress;
    }

    function getGames() public view returns (BattleshipImpl[] memory) {
        BattleshipImpl[] memory games = new BattleshipImpl[](gameId);
        for (uint i = 0; i < gameId; i++) {
            games[i] = BattleshipGames[i];
        }
        return games;
    }
}
