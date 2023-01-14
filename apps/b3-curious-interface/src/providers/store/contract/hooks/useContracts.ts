import { ContractStateAction } from './../actions';
import { useProvider, useSigner } from 'wagmi';
import { useEffect } from 'react'
import {
  FractalModule__factory as FractalModuleInterface,
  FractalNameRegistry__factory as FractalNameRegistryInterface,
  UsulVetoGuard__factory as UsulVetoGuardInterface,
  VetoERC20Voting__factory as VetoERC20VotingInterface,
  VetoGuard__factory as VetoGuardInterface,
  VetoMultisigVoting__factory as VetoMultisigVotingInterface,
  VotesToken__factory as VotesTokenInterface,
  GnosisSafeProxyFactory__factory as GnosisSafeProxyInterface,
  GnosisSafe__factory as GnosisSafInterface,
  ModuleProxyFactory__factory as ModuleProxyFactoryInterface,
  OZLinearVoting__factory as OZLinearVotingInterface,
  FractalUsul__factory as FractalUsulInterface,
} from '@fractal-framework/fractal-contracts'

import {
  BattleshipFactory__factory as BattleshipFactoryInterface,
  Battleship__factory as BattleshipInterface,
} from 'b3-curious-contracts/typechain'

import { useNetworkConfg } from '../../../network/NetworkConfigProvider';
import { Dispatch } from '../../context';

export function useContracts(dispatch: Dispatch) {
  const { contracts } = useNetworkConfg()
  const { data: signer } = useSigner()
  const provider = useProvider();

  useEffect(() => {
    if (!provider || !signer || !contracts.battleshipFactory) {
      return;
    }
    const signerOrProvider = signer || provider
    // b3 contracts
    const battleshipFactory = BattleshipFactoryInterface.connect(contracts.battleshipFactory, signerOrProvider)
    const battleship = BattleshipInterface.connect(contracts.battleship, signerOrProvider)

    // fractal contracts
    const fractalModule = FractalModuleInterface.connect(contracts.fractalModuleMasterCopy, signerOrProvider)
    const fractalNameRegistry = FractalNameRegistryInterface.connect(contracts.fractalNameRegistry, signerOrProvider)
    const usulVetoGuard = UsulVetoGuardInterface.connect(contracts.usulVetoGuardMasterCopy, signerOrProvider)
    const vetoERC20Voting = VetoERC20VotingInterface.connect(contracts.vetoERC20VotingMasterCopy, signerOrProvider)
    const vetoGuard = VetoGuardInterface.connect(contracts.gnosisVetoGuardMasterCopy, signerOrProvider)
    const vetoMultisig = VetoMultisigVotingInterface.connect(contracts.vetoMultisigVotingMasterCopy, signerOrProvider)
    const votesToken = VotesTokenInterface.connect(contracts.votesTokenMasterCopy, signerOrProvider)
    const gnosisSafe = GnosisSafInterface.connect(contracts.gnosisSafe, signerOrProvider)
    const gnosisSafeProxy = GnosisSafeProxyInterface.connect(contracts.gnosisSafeFactory, signerOrProvider)
    const moduleProxyFactory = ModuleProxyFactoryInterface.connect(contracts.zodiacModuleProxyFactory, signerOrProvider)
    const ozLinearVoting = OZLinearVotingInterface.connect(contracts.linearVotingMasterCopy, signerOrProvider)
    const fractalUsulFactory = FractalUsulInterface.connect(contracts.fractalUsulMasterCopy, signerOrProvider)

    dispatch({
      type: ContractStateAction.SET_CONTRACTS,
      payload: {
        b3Curious: {
          battleshipFactory,
          battleship
        },
        fractal: {
          fractalModule,
          fractalNameRegistry,
          usulVetoGuard,
          vetoERC20Voting,
          vetoGuard,
          vetoMultisig,
          votesToken,
          gnosisSafe,
          gnosisSafeProxy,
          moduleProxyFactory,
          ozLinearVoting,
          fractalUsulFactory
        }
      }
    })
  }, [provider, signer, contracts, dispatch])

  return
}
