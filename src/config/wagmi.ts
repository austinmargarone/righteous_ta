// src/config/wagmi.ts
"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "RighteousTA",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  chains: [mainnet, sepolia],
  ssr: true,
});
