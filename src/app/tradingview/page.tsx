import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TradingViewWidget from "@/components/Charts/TradingViewWidget";

export const metadata: Metadata = {
  title: "RighteousTA | TradingView Charts",
  description: "Find you currency pair and start trading with RighteousTA.",
};

const TradingView = () => {
  return (
    <DefaultLayout>
      <div className="h-full w-full">
        <TradingViewWidget />
      </div>
    </DefaultLayout>
  );
};

export default TradingView;
