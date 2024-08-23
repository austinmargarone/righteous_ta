import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoNews from "@/components/data/news/CryptoNews";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
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
