import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CoinList100 from "@/components/data/list/CoinList100";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
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
