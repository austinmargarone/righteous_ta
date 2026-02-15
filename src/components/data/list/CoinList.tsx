"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  price: string;
  btcPrice: string;
  iconUrl: string;
  marketCap: string;
  change: number;
  rank: string;
}

interface CoinListProps {
  maxCoinsToShow: number;
}

const formatUsdPrice = (price: number | string): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num) || num === 0) return "0.00";

  if (num >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  if (num >= 1) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }
  if (num >= 0.01) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  }
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 6,
    maximumFractionDigits: 8,
  });
};

const formatBtcPrice = (btcPrice: number | string): string => {
  const num = typeof btcPrice === "string" ? parseFloat(btcPrice) : btcPrice;
  if (isNaN(num) || num === 0) return "0";

  let str = num.toFixed(8);
  str = str.replace(/\.?0+$/, "");
  return str;
};

const formatNumberWithCommas = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinList: React.FC<CoinListProps> = ({ maxCoinsToShow }) => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/coins?max=${maxCoinsToShow}`);

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        const coins: Coin[] = response.data.coins.map((coin: any) => ({
          uuid: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.price,
          btcPrice: coin.btcPrice,
          iconUrl: coin.iconUrl,
          marketCap: coin.marketCap,
          change: coin.change,
          rank: coin.rank,
        }));

        setCoinList(coins);
      } catch (err: any) {
        console.error("Error fetching coins from API route:", err);
        setError("Failed to load cryptocurrency data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maxCoinsToShow]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <span className="ml-4 text-body dark:text-bodydark">
          Loading top coins...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dark:text-red-400 py-10 text-center text-danger">
        {error}
      </div>
    );
  }

  if (!coinList.length) {
    return (
      <div className="py-10 text-center text-body dark:text-bodydark">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-6">
      {/* Desktop / Tablet View */}
      <div className="hidden sm:block">
        <table className="min-w-full table-fixed divide-y divide-stroke dark:divide-strokedark">
          <thead className="bg-gray-2 dark:bg-meta-4">
            <tr>
              <th
                scope="col"
                className="w-16 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Rank
              </th>
              <th
                scope="col"
                className="w-16 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Icon
              </th>
              <th
                scope="col"
                className="w-40 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Name
              </th>
              <th
                scope="col"
                className="w-24 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Symbol
              </th>
              <th
                scope="col"
                className="w-32 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Price
              </th>
              <th
                scope="col"
                className="w-32 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                BTC Price
              </th>
              <th
                scope="col"
                className="w-40 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                Market Cap
              </th>
              <th
                scope="col"
                className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark"
              >
                24h Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke bg-white dark:divide-strokedark dark:bg-boxdark">
            {coinList.map((coin) => (
              <tr
                key={coin.uuid}
                className="transition-colors hover:bg-gray-2 dark:hover:bg-meta-4"
              >
                <td className="whitespace-nowrap px-4 py-4 font-medium text-black dark:text-white">
                  {coin.rank}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                  />
                </td>
                <td
                  className="max-w-0 truncate px-4 py-4 text-sm text-black dark:text-white"
                  title={coin.name}
                >
                  {coin.name}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-body dark:text-bodydark">
                  {coin.symbol}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-black dark:text-white">
                  ${formatUsdPrice(coin.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-warning dark:text-warning">
                  ₿{formatBtcPrice(coin.btcPrice)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-black dark:text-white">
                  ${formatNumberWithCommas(Math.round(Number(coin.marketCap)))}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${
                      coin.change >= 0
                        ? "bg-success/10 text-success dark:bg-success/20 dark:text-success"
                        : "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger"
                    }`}
                  >
                    {coin.change >= 0 ? "+" : ""}
                    {coin.change.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="divide-y divide-stroke dark:divide-strokedark sm:hidden">
        {coinList.map((coin) => (
          <div
            key={coin.uuid}
            className="flex flex-col items-center gap-3 bg-white px-4 py-6 text-center dark:bg-boxdark"
          >
            <div className="text-xl font-bold text-black dark:text-white">
              {coin.rank}
            </div>
            <Image
              src={coin.iconUrl}
              alt={coin.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="font-semibold text-black dark:text-white">
              {coin.symbol}
            </div>
            <div
              className="max-w-[80vw] truncate text-sm text-body dark:text-bodydark"
              title={coin.name}
            >
              {coin.name}
            </div>
            <div className="text-lg font-medium text-black dark:text-white">
              ${formatUsdPrice(coin.price)}
            </div>
            <div className="text-warning dark:text-warning">
              ₿{formatBtcPrice(coin.btcPrice)}
            </div>
            <div className="font-medium text-black dark:text-white">
              ${formatNumberWithCommas(Math.round(Number(coin.marketCap)))}
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                  coin.change >= 0
                    ? "bg-success/10 text-success dark:bg-success/20 dark:text-success"
                    : "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger"
                }`}
              >
                {coin.change >= 0 ? "+" : ""}
                {coin.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
