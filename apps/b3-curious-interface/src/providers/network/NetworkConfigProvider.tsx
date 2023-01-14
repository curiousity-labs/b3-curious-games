import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { goerliConfig } from './networks'
import { IContracts } from './types'

export type NetworkConfig = {
  contracts: IContracts
}

export const defaultState = {
  contracts: {
    gnosisSafe: '',
    gnosisSafeFactory: '',
    gnosisVetoGuardMasterCopy: '',
    gnosisMultisend: '',
    linearVotingMasterCopy: '',
    zodiacModuleProxyFactory: '',
    claimingFactory: '',
    fractalUsulMasterCopy:'',
    fractalModuleMasterCopy: '',
    fractalNameRegistry: '',
    votesTokenMasterCopy: '',
    claimingMasterCopy: '',
    usulVetoGuardMasterCopy: '',
    vetoMultisigVotingMasterCopy: '',
    vetoERC20VotingMasterCopy: '',
    battleshipFactory: '',
    battleship: ''
  },
}

export const NetworkConfigContext = createContext({} as NetworkConfig)

export const useNetworkConfg = (): NetworkConfig =>
  useContext(NetworkConfigContext as Context<NetworkConfig>)

const getNetworkConfig = (chainId: number) => {
  switch (chainId) {
    case 5:
    case 31337:
      return goerliConfig
    case 1:
    default:
      return defaultState
  }
}

export function NetworkConfigProvider({ children }: { children: ReactNode }) {
  const { chain } = useNetwork()
  const [config, setConfig] = useState<NetworkConfig>(getNetworkConfig(5))

  useEffect(() => {
    if (chain) {
      setConfig(getNetworkConfig(chain.id))
    }
  }, [chain])

  return <NetworkConfigContext.Provider value={config}>{children}</NetworkConfigContext.Provider>
}
