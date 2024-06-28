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
    <div className="col-span-12 h-[25rem] rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold text-black">{coinData.name}</h4>
          <div className="mt-[1.5rem] flex flex-col gap-[1.5rem]">
            <p>
              Rank: <span> {coinData.rank}</span>
            </p>
            <p>
              Description: <span> {coinData.description}</span>
            </p>
            <p>
              Number of Markets: <span> {coinData.numberOfMarkets}</span>
            </p>
            <p>
              Number of Exchanges: <span> {coinData.numberOfExchanges}</span>
            </p>
            <p>
              All Time High: <span> {coinData.allTimeHigh.price}</span>
            </p>
          </div>
          {coinData.websiteUrl && (
            <div className="mt-[1.5rem]">
              <Link href={coinData.websiteUrl} target="_blank">
                <button className="rounded-md bg-blue-600 px-3 py-1 text-white">
                  Visit Website
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinData;
