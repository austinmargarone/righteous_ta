import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "RighteousTA | Terms of Service",
  description:
    "RighteousTA is a technial analysis website that provides information on the latest trends in the market.",
};

const Terms = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Terms of Service" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h2>RigheousTA</h2>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Terms;
