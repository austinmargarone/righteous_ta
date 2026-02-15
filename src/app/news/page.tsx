import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoNews from "@/components/data/news/CryptoNews";

export const metadata: Metadata = {
  title: "Crypto News | RighteousTA",
  description:
    "Stay updated with the latest cryptocurrency news and market trends on RighteousTA.",
  openGraph: {
    title: "Crypto News | RighteousTA",
    description:
      "Stay updated with the latest cryptocurrency news and market trends on RighteousTA.",
    url: "https://www.righteousta.com/news",
    images: [
      {
        url: "/images/meta/meta.jpeg",
        width: 1200,
        height: 630,
        alt: "RighteousTA Crypto News Page – Crypto Technical Analysis Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto News | RighteousTA",
    description:
      "Stay updated with the latest cryptocurrency news and market trends on RighteousTA.",
    images: ["/images/meta/meta.jpeg"],
  },
};

const News = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Crypto News" />
      <CryptoNews />
    </DefaultLayout>
  );
};

export default News;
