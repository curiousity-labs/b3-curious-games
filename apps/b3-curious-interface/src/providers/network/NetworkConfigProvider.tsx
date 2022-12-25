import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { goerliConfig } from './networks'

export type NetworkConfig = {
  contracts: object
}

export const defaultState = {
  contracts: {},
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
