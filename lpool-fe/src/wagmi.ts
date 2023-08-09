import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet, polygonMumbai } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'

import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '0'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;
 
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: alchemyKey })],
)
 

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: walletConnectProjectId,
    //   },
    // }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
})

// const { chains, publicClient } = configureChains(
//   [mainnet, polygonMumbai],
//   [alchemyProvider({ apiKey: '5nJqS5GVJhF3v0CAhuTLLsOLTY_yZhVK' }), publicProvider()],
// )
 
// export const config = createConfig({
//   autoConnect: true,
//   connectors: [new InjectedConnector({ chains })],
//   publicClient,
// })
