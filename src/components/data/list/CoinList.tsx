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
        const data = response.data.data.data;
        if (Array.isArray(data.coins)) {
          setCoinList(data.coins);
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
    <div>
      <h2>Coin List</h2>
      <ul className="ny-auto flex flex-col justify-center">
        {coinList.map((coin) => (
          <li className="my-auto flex h-16 gap-4 py-4" key={coin.uuid}>
            <p className="w-12">{coin.rank}</p>
            <div className="h-12 w-12">
              <Image
                src={coin.iconUrl}
                alt={coin.name}
                width={24}
                height={24}
              />
            </div>
            <div className="flex w-[10rem] gap-2">
              <p className="w-full truncate">{coin.name}</p>
              <p>{coin.symbol}</p>
            </div>
            <p className="w-[5rem]">${Number(coin.price).toFixed(2)}</p>
            <p className="w-[6rem]">{Number(coin.btcPrice).toFixed(8)}</p>
            <p className="w-[6rem]">{coin.marketCap} </p>
            <p>{coin.change}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
