import type { Metadata } from "next";
import "@/css/satoshi.css";
import "@/css/style.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Providers } from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: {
    default: "RighteousTA – Crypto Technical Analysis Platform",
    template: "%s | RighteousTA",
  },
  description:
    "Advanced cryptocurrency technical analysis platform. Real-time charts, indicators, market cap rankings, price trends, alerts, and trading insights for Bitcoin, Ethereum, altcoins and more.",
  keywords: [
    "crypto technical analysis",
    "cryptocurrency charts",
    "bitcoin TA",
    "ethereum analysis",
    "crypto trading tools",
    "altcoin technical analysis",
    "RighteousTA",
  ],
  openGraph: {
    title: "RighteousTA – Crypto TA Platform",
    description:
      "Professional tools for crypto technical analysis and market insights.",
    url: "https://www.righteousta.com",
    images: ["/public/RighteousTA.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RighteousTA – Crypto Technical Analysis",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/public/RighteousTA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ClientWrapper>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
