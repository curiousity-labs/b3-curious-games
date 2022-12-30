import {
  FractalModule,
  FractalNameRegistry,
  UsulVetoGuard,
  VetoERC20Voting,
  VetoGuard,
  VetoMultisigVoting,
  VotesToken,
  GnosisSafe,
  GnosisSafeProxyFactory,
  ModuleProxyFactory,
  OZLinearVoting,
  FractalUsul,
} from '@fractal-framework/fractal-contracts'
import { BattleshipFactory, BattleshipImpl } from 'b3-curious-contracts/typechain'

export interface ContractState {
  fractal: FractalContracts | null
  b3Curious: B3Contracts | null
}

export type B3Contracts = {
  battleshipFactory: BattleshipFactory
  battleshipImpl: BattleshipImpl
}

export type FractalContracts = {
  fractalModule: FractalModule
  fractalNameRegistry: FractalNameRegistry
  usulVetoGuard: UsulVetoGuard
  vetoERC20Voting: VetoERC20Voting
  vetoGuard: VetoGuard
  vetoMultisig: VetoMultisigVoting
  votesToken: VotesToken
  gnosisSafe: GnosisSafe
  gnosisSafeProxy: GnosisSafeProxyFactory
  moduleProxyFactory: ModuleProxyFactory
  ozLinearVoting: OZLinearVoting
  fractalUsulFactory: FractalUsul
}
