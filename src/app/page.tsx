import TraderDash from "@/components/Dashboard/TraderDash";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CoinInfo from "@/components/data/price/CoinInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RighteousTA",
  description: "Crypto Trading Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <CoinInfo />
        <TraderDash />
      </DefaultLayout>
    </>
  );
}
