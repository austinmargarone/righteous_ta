import Link from "next/link";
import React from "react";

interface CoinDataProps {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  numberOfMarkets: number;
  numberOfExchanges: number;
  rank: number;
  allTimeHigh: { price: number; timestamp: number };
}

const CoinData = (coinData: CoinDataProps) => {
  // Log the coinData object to debug
  console.log(coinData);

  return (
    <div className="col-span-12 h-[25rem] rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <h4 className="mb-4 text-2xl font-semibold text-black dark:text-white">
            {coinData.name}
          </h4>
          <div className="flex flex-col gap-4">
            <p className="text-gray-700 dark:text-gray-300 text-base">
              <strong>Rank:</strong> {coinData.rank}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              <strong>Description:</strong> {coinData.description}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              <strong>Number of Markets:</strong> {coinData.numberOfMarkets}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              <strong>Number of Exchanges:</strong> {coinData.numberOfExchanges}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              <strong>All Time High:</strong> ${coinData.allTimeHigh.price}
            </p>
          </div>
        </div>
        {coinData.websiteUrl && (
          <div className="mt-4">
            <Link href={coinData.websiteUrl} target="_blank">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700">
                Visit Website
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinData;
