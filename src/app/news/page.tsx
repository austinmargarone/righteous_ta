import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import CryptoNews from "@/components/data/news/CryptoNews";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const News = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>

      <CryptoNews />
    </DefaultLayout>
  );
};

export default News;
