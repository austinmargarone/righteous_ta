"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  console.warn(
    "WalletConnect Project ID missing – using fallback. Add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID to .env.local",
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "RighteousTA",
  projectId: projectId || "fallback-project-id-for-build", // fallback for build only
  chains: [mainnet, sepolia],
  ssr: true,
});
