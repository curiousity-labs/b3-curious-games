// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ConnectFour.sol";

contract ConnectFourFactory {
    event NewConnectFourSeasonCreated(uint seasonId, address gameAddress);

    uint private seasonId;
    address private connectFourImplAddr;

    // gameId -> contract implementation
    mapping(uint => ConnectFour) public connectFourGames;

    function deployNewSeason(
    ) public returns (uint) {
        ConnectFour newGame = ConnectFour(Clones.clone(connectFourImplAddr));
        connectFourGames[seasonId] = newGame;
        
        emit NewConnectFourSeasonCreated(seasonId, address(newGame));

        return seasonId++;
    }

    constructor(address implAddress) {
        connectFourImplAddr = implAddress;
    }

    function getGames() public view returns (ConnectFour[] memory) {
        ConnectFour[] memory games = new ConnectFour[](seasonId);
        for (uint i = 0; i < seasonId; i++) {
            games[i] = connectFourGames[i];
        }
        return games;
    }
}
