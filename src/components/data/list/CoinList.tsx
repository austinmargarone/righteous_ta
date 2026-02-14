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

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: maxCoinsToShow,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
              locale: "en",
            },
          },
        );

        const coins: Coin[] = response.data.map((coin: any, index: number) => ({
          uuid: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price?.toString() || "0",
          btcPrice: "N/A",
          iconUrl: coin.image,
          marketCap: coin.market_cap?.toString() || "0",
          change: coin.price_change_percentage_24h || 0,
          rank: coin.market_cap_rank?.toString() || (index + 1).toString(),
        }));

        setCoinList(coins);
      } catch (err) {
        console.error("Error fetching coin data:", err);
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
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        <span className="text-gray-600 dark:text-gray-300 ml-4">
          Loading top coins...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 py-10 text-center">{error}</div>;
  }

  if (!coinList.length) {
    return <div className="py-10 text-center">No data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop / Tablet View */}
      <div className="hidden sm:block">
        <table className="divide-gray-200 dark:divide-gray-700 min-w-full divide-y">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Icon
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Symbol
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                BTC Price
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Market Cap
              </th>
              <th
                scope="col"
                className="text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                24h Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 dark:bg-gray-900 dark:divide-gray-700 divide-y bg-white">
            {coinList.map((coin) => (
              <tr
                key={coin.uuid}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium dark:text-white">
                  {coin.rank}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                  />
                </td>
                <td className="text-gray-900 dark:text-gray-200 whitespace-nowrap px-6 py-4 text-sm">
                  {coin.name}
                </td>
                <td className="text-gray-500 dark:text-gray-400 whitespace-nowrap px-6 py-4 text-sm">
                  {coin.symbol}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                    ${formatUsdPrice(coin.price)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[#f7931a] dark:text-yellow-400">
                  ₿{formatBtcPrice(coin.btcPrice)}
                </td>
                <td className="text-gray-900 dark:text-gray-200 whitespace-nowrap px-6 py-4">
                  ${formatNumberWithCommas(Math.round(Number(coin.marketCap)))}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${
                      coin.change >= 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
      <div className="divide-gray-200 dark:divide-gray-700 divide-y sm:hidden">
        {coinList.map((coin) => (
          <div
            key={coin.uuid}
            className="flex flex-col items-center gap-3 px-4 py-6 text-center"
          >
            <div className="text-gray-900 text-xl font-bold dark:text-white">
              {coin.rank}
            </div>
            <Image
              src={coin.iconUrl}
              alt={coin.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="font-semibold">{coin.symbol}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {coin.name}
            </div>
            <div className="text-lg font-medium">
              ${formatUsdPrice(coin.price)}
            </div>
            <div className="text-[#f7931a] dark:text-yellow-400">
              ₿{formatBtcPrice(coin.btcPrice)}
            </div>
            <div className="text-gray-800 dark:text-gray-200">
              ${formatNumberWithCommas(Math.round(Number(coin.marketCap)))}
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                  coin.change >= 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
