# Game Contracts

## Battleship.sol
Contract to play a game of on-chain Battleship. This contract deploys directory for each game.

## BattleshipFactory.sol + BattleshipImpl.sol
FactorContract and Implementation Contract to save gas cost when creating new games. Uses [OpenZepplein]()'s `Clones` contract.

## Scripts

| name | description |
| :---- | :---------- |
| test | run `hardhat` tests |
| compile | run `hardhat` compiler; also runs `typechain` compiler |
| deploy:bsfactory:goerli | deploys battleship factory and impl contracts to goerli network |
| verify:bsfactory:goerli | un-verified deployed contracts on goerli network |

## Local Development

setup...

```shall
nvm use
pnpm install
```

compile...

```shell
pnpm run compile
```

## Credits
### Connect Four
Connect Four contract variables and methods inspired from:
[Miguel Piedrafita](https://github.com/m1guelpf)
[Connect4 Smart Contract](https://github.com/m1guelpf/connect4-sol/blob/main/src/ConnectFour.sol)