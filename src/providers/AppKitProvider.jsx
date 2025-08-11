import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { arbitrum, mainnet } from '@reown/appkit/networks';

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId from https://dashboard.reown.com
const projectId = 'bc3da4f2274480ad6863940eae71e0fe';

// Optional metadata
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Set networks
const networks = [mainnet, arbitrum];

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
