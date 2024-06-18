import React from "react";
import TradingViewWidget from "./TradingViewWidget";

const TVChartOne: React.FC = () => {
  return (
    <div className="col-span-12 h-screen rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 xl:h-full">
      <TradingViewWidget />
    </div>
  );
};

export default TVChartOne;
