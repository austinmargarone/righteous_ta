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
  unid: string;
}

const CoinList: React.FC = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/list");
        console.log("API Response:", response.data.data.data); // Log the data to see the structure
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
      <ul>
        {coinList.map((coin) => (
          <li className="my-[1rem] flex gap-4" key={coin.uuid}>
            <p>{coin.rank}</p>
            <Image src={coin.iconUrl} alt={coin.name} width={24} height={24} />
            <p>{coin.name}</p>
            <p>{coin.symbol}</p>
            <p>${coin.price}</p>
            <p>{coin.btcPrice}</p>
            <p>{coin.marketCap} </p>
            <p>{coin.change}</p>
            <p>{coin.unid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
