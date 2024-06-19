"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  color: string;
  description: string;
  marketCap: number;
  supply: {
    max: number;
    circulating: number;
  };
  websiteUrl: string;
}

const CoinInfoComponent: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/coins");
        const data = response.data.data;
        setCoinData(data.data.coin);
        setError(null);
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

  if (!coinData) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <h2>Coin Information</h2>
      <p>Name: {coinData.name}</p>
      <p>Symbol: {coinData.symbol}</p>
      <p>
        Price:
        {coinData.price}
      </p>
      <p>Color: {coinData.color}</p>
      <p>Description: {coinData.description}</p>
      <p>Marketcap: {coinData.marketCap}</p>
      <p>Supply: {coinData.supply.max}</p>
      <p>Website: {coinData.websiteUrl}</p>
    </div>
  );
};

export default CoinInfoComponent;
