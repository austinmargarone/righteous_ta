import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CoinList from "@/components/data/list/CoinList";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Donate = () => {
  return (
    <DefaultLayout>
      <div className="h-full w-full">
        <CoinList />
      </div>
    </DefaultLayout>
  );
};

export default Donate;
