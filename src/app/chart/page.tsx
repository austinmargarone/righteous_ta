import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Chart | RighteousTA",
  description:
    "View detailed cryptocurrency charts and technical analysis on RighteousTA.",
  openGraph: {
    title: "Chart | RighteousTA",
    description:
      "View detailed cryptocurrency charts and technical analysis on RighteousTA.",
    url: "https://www.righteousta.com/chart",
    images: [
      {
        url: "/images/meta/meta.jpeg",
        width: 1200,
        height: 630,
        alt: "RighteousTA Chart Page – Crypto Technical Analysis Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chart | RighteousTA",
    description:
      "View detailed cryptocurrency charts and technical analysis on RighteousTA.",
    images: ["/images/meta/meta.jpeg"],
  },
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
