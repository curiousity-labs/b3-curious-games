import { localhost } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css'

import { configureChains, createClient, goerli } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

export const chainsArr = [goerli];

if(process.env.NODE_ENV === 'development') {
  chainsArr.push(localhost)
}

export const { chains, provider } = configureChains(
  chainsArr,
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_ID }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'b3 Curious',
  chains
});


export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
