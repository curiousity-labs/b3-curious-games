// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ConnectFour.sol";

contract ConnectFourFactory {
    event GameCreated(address gameAddress, address teamOne, address teamTwo);

    uint private gameId;
    address private connectFourImplAddr;

    // gameId -> contract implementation
    mapping(uint => ConnectFour) ConnectFourGames;

    modifier uniqueTeams(address teamTwo) {
        require(msg.sender != teamTwo);
        _;
    }

    function deployAndChallange(address teamTwo) external uniqueTeams(teamTwo) {
        ConnectFour newGame = ConnectFour(
            Clones.clone(connectFourImplAddr)
        );
        newGame.init(msg.sender, teamTwo);
        ConnectFourGames[gameId] = newGame;
        gameId = ++gameId;
        emit GameCreated(address(newGame), msg.sender, teamTwo);
    }

    constructor(address implAddress) {
        connectFourImplAddr = implAddress;
    }

    function getGames() public view returns (ConnectFour[] memory) {
        ConnectFour[] memory games = new ConnectFour[](gameId);
        for (uint i = 0; i < gameId; i++) {
            games[i] = ConnectFourGames[i];
        }
        return games;
    }
}
