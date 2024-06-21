"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Coin {
  name: string;
  uuid: string;
  price: string;
  btcPrice: string;
  iconUrl: string;
  marketCap: string;
  symbol: string;
  change: number; // Change type from string to number
  rank: string;
}

const CoinList: React.FC = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/list");
        const data = response.data.data.data;
        if (Array.isArray(data.coins)) {
          setCoinList(
            data.coins.map((coin: any) => ({
              ...coin,
              change: parseFloat(coin.change), // Convert change to number
            })),
          );
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coinList.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="mb-4 text-center text-xl font-bold">Coin List</h2>
      <div className="border-gray-200 overflow-hidden border-b shadow-lg sm:rounded-lg">
        {/* Desktop/Tablet View */}
        <div className="hidden sm:block">
          <div className="min-w-full overflow-x-auto">
            <table className="divide-gray-200 min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Symbol
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    BTC Price
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Market Cap
                  </th>
                  <th
                    scope="col"
                    className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-gray-200 divide-y bg-white">
                {coinList.map((coin) => (
                  <tr key={coin.uuid}>
                    <td className="whitespace-nowrap px-6 py-4">{coin.rank}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            src={coin.iconUrl}
                            alt={coin.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-900 whitespace-nowrap px-6 py-4 text-sm">
                      {coin.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {coin.symbol}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        ${Number(coin.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Number(coin.btcPrice).toFixed(8)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {coin.marketCap.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          coin.change >= 0
                            ? "bg-green-100 text-green-800"
                            : "bg-[#FEE2E2] text-[#9B2C2C]"
                        }`}
                      >
                        {coin.change > 0
                          ? `+${coin.change.toFixed(2)}%`
                          : `${coin.change.toFixed(2)}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden">
          <div className="divide-gray-200 divide-y">
            {coinList.map((coin) => (
              <div
                key={coin.uuid}
                className="flex flex-col items-center gap-4 px-4 py-4"
              >
                <p className="text-center">{coin.rank}</p>
                <div className="h-12 w-12">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-sm">{coin.name}</p>
                <p className="text-center">{coin.symbol}</p>
                <p className="text-center">
                  <span className="pr-1">$</span>
                  {Number(coin.price).toFixed(2)}
                </p>
                <p className="text-center">
                  {Number(coin.btcPrice).toFixed(8)}
                </p>
                <p className="text-center">{coin.marketCap.toLocaleString()}</p>
                <p className="text-center">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      coin.change >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-[#FEE2E2] text-[#9B2C2C]"
                    }`}
                  >
                    {coin.change > 0
                      ? `+${coin.change.toFixed(2)}%`
                      : `${coin.change.toFixed(2)}%`}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinList;
