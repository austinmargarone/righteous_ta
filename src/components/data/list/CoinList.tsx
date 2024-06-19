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
  change: string;
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
        console.log("API Response:", response.data);
        const data = response.data;

        if (data && Array.isArray(data.coins)) {
          setCoinList(data.coins);
        } else {
          setError(
            "Unexpected data format: coins array not found or not an array",
          );
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
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Rank
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Icon
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Symbol
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                BTC Price
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Market Cap
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Change
              </h5>
            </div>
          </div>

          {coinList.map((coin) => (
            <div
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
              key={coin.uuid}
            >
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="w-12">{coin.rank}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="h-12 w-12">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="w-[10rem] truncate">{coin.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p>{coin.symbol}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p>
                  <span className="pr-[.125rem]">$</span>
                  {Number(coin.price).toFixed(2)}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p>{Number(coin.btcPrice).toFixed(8)}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p>{coin.marketCap} </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p>{coin.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinList;
