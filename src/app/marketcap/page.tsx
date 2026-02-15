import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CoinList100 from "@/components/data/list/CoinList100";

export const metadata: Metadata = {
  title: "Market Cap | RighteousTA",
  description:
    "View the market capitalization of the top 100 cryptocurrencies on RighteousTA.",
  openGraph: {
    title: "Market Cap | RighteousTA",
    description:
      "View the market capitalization of the top 100 cryptocurrencies on RighteousTA.",
    url: "https://www.righteousta.com/marketcap",
    images: [
      {
        url: "/images/meta/meta.jpeg",
        width: 1200,
        height: 630,
        alt: "RighteousTA Market Cap Page – Crypto Technical Analysis Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Cap | RighteousTA",
    description:
      "View the market capitalization of the top 100 cryptocurrencies on RighteousTA.",
    images: ["/images/meta/meta.jpeg"],
  },
};

const MarketCap = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Market Cap" />

      <div className="flex flex-col gap-10">
        <CoinList100 />
      </div>
    </DefaultLayout>
  );
};

export default MarketCap;
