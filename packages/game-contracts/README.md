# Game Contracts

## Battleship.sol
Contract to play a game of on-chain Battleship. This contract deploys directory for each game.

## BattleshipFactory.sol + BattleshipImpl.sol
FactorContract and Implementation Contract to save gas cost when creating new games. Uses [OpenZepplein]()'s `Clones` contract.

## Scripts

```shell
pnpm run test // run tests
pnpm run compile // run hardhat compilier
```

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