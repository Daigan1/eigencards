
// config/index.tsx

import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, holesky, polygonAmoy } from '@reown/appkit/networks';
import 'dotenv/config';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_APPKIT;

export const networks = [mainnet, arbitrum, holesky, polygonAmoy]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig