
// context/index.tsx
'use client'

import { wagmiAdapter, projectId } from "./config"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum, avalanche, base, optimism, polygon, polygonAmoy, holesky } from '@reown/appkit/networks'
import { React } from 'react'
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import { redirect } from 'next/navigation'


console.log(projectId)
// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  console.log(projectId)
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'eigencards',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// const siweConfig = createSIWEConfig({
//   onSignIn: (session) => {
//     redirect("/home");
//   },
//   onSignOut: () => {
//     redirect("/unauthenticated");
//   }
// })



// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, avalanche, base, optimism, polygon, polygonAmoy, holesky],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  // siweConfig

})

function ContextProvider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
