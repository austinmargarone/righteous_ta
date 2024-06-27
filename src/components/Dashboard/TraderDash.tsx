"use client";
import React, { useEffect, useState } from "react";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import CardDataStats from "../CardDataStats";
import TVChartOne from "../Charts/TVChartOne";
import CoinList10 from "../data/list/CoinList10";
import axios from "axios";
import Image from "next/image";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  btcPrice: string;
  color: string;
  description: string;
  marketCap: string;
  supply: {
    max: number;
    circulating: number;
  };
  websiteUrl: string;
  iconUrl: string;
  change: number;
}

const formatNumberWithCommas = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TraderDash: React.FC = () => {
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
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="USD Price"
          total={`$${Number(coinData.price).toFixed(2)}`}
          rate={coinData.change.toString()}
        >
          <Image
            src={coinData.iconUrl}
            alt={coinData.name}
            width={30}
            height={30}
          />
        </CardDataStats>

        <CardDataStats
          title="BTC Price"
          total={`₿${Number(coinData.btcPrice).toFixed(8)}`}
          rate={""}
        >
          <Image
            src={coinData.iconUrl}
            alt={coinData.name}
            width={30}
            height={30}
          />
        </CardDataStats>
        <CardDataStats
          title="Market Cap"
          total={`$${formatNumberWithCommas(Number(coinData.marketCap).toFixed(0))}`}
          rate={""}
        >
          <Image
            src={coinData.iconUrl}
            alt={coinData.name}
            width={30}
            height={30}
          />{" "}
        </CardDataStats>
        <CardDataStats
          title="Total Supply"
          total={formatNumberWithCommas(coinData.supply.max)}
          rate={""}
        >
          <Image
            src={coinData.iconUrl}
            alt={coinData.name}
            width={30}
            height={30}
          />{" "}
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TVChartOne />
        <ChartTwo />
        {/* <MapOne /> */}
        <ChatCard />
        <div className="col-span-12 xl:col-span-8">
          <CoinList10 />
        </div>
      </div>
    </>
  );
};

export default TraderDash;
