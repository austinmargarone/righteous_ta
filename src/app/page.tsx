import TraderDash2 from "@/components/Dashboard/TraderDash2";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RighteousTA",
  description: "Crypto Trading Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <TraderDash2 />
      </DefaultLayout>
    </>
  );
}
