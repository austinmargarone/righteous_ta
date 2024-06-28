import React from "react";
import CoinList from "./CoinList";

const CoinList100 = () => {
  const maxCoinsToShow = 100;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 100 Coins
      </h4>

      <div className="flex flex-col overflow-x-auto">
        <CoinList maxCoinsToShow={maxCoinsToShow} />
      </div>
    </div>
  );
};

export default CoinList100;
