// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ConnectFour.sol";

contract ConnectFourFactory {
    event NewConnectFourSeasonCreated(address gameAddress);

    uint private seasonId;
    address private connectFourImplAddr;

    // gameId -> contract implementation
    mapping(uint => ConnectFour) ConnectFourGames;

    modifier uniqueTeams(address opponent) {
        require(msg.sender != opponent);
        _;
    }

    function deployNewSeason(
        address opponent
    ) public uniqueTeams(opponent) returns (uint) {
        ConnectFour newGame = ConnectFour(Clones.clone(connectFourImplAddr));
        ConnectFourGames[seasonId] = newGame;
        emit NewConnectFourSeasonCreated(address(newGame));

        return seasonId++;
    }

    constructor(address implAddress) {
        connectFourImplAddr = implAddress;
    }

    function getGames() public view returns (ConnectFour[] memory) {
        ConnectFour[] memory games = new ConnectFour[](seasonId);
        for (uint i = 0; i < seasonId; i++) {
            games[i] = ConnectFourGames[i];
        }
        return games;
    }
}
