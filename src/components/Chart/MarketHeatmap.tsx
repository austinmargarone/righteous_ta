"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeatmapProps {
  onSymbolClick: (symbol: string) => void;
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  image: string;
}

export default function MarketHeatmap({ onSymbolClick }: HeatmapProps) {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/heatmap");

        if (!response.ok) {
          throw new Error("Failed to fetch heatmap data");
        }

        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching heatmap:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (change: number) => {
    if (change > 10) return "bg-green-600";
    if (change > 5) return "bg-green-500";
    if (change > 2) return "bg-green-400";
    if (change > 0) return "bg-green-300";
    if (change > -2) return "bg-red-300";
    if (change > -5) return "bg-red-400";
    if (change > -10) return "bg-red-500";
    return "bg-red-600";
  };

  const getTextColor = (change: number) => {
    if (Math.abs(change) > 5) return "text-white";
    return "text-gray-900 dark:text-white";
  };

  const handleSymbolClick = (symbol: string) => {
    onSymbolClick(`${symbol}USDT`);
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-3 dark:border-strokedark">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Market Heatmap
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-bodydark">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-3 dark:border-strokedark">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Market Heatmap
          </h3>
        </div>
        <div className="text-red-500 flex flex-1 items-center justify-center p-4 text-center">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-4 py-3 dark:border-strokedark">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          Market Heatmap
        </h3>
        <p className="text-xs text-bodydark">24h price changes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {cryptoData.map((crypto) => {
            const color = getColor(crypto.priceChange24h);
            const textColor = getTextColor(crypto.priceChange24h);

            return (
              <button
                key={crypto.id}
                onClick={() => handleSymbolClick(crypto.symbol.toUpperCase())}
                className={`${color} ${textColor} flex flex-col items-center justify-center rounded-lg p-3 transition-all hover:scale-105 hover:shadow-lg`}
                title={`${crypto.name} - Market Cap: $${(crypto.marketCap / 1e9).toFixed(2)}B`}
              >
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={32}
                  height={32}
                  className="mb-1.5 h-8 w-8 rounded-full"
                  unoptimized
                />
                <div className="text-xs font-bold">
                  {crypto.symbol.toUpperCase()}
                </div>
                <div className="text-base font-bold">
                  {crypto.priceChange24h > 0 ? "+" : ""}
                  {crypto.priceChange24h.toFixed(2)}%
                </div>
                <div className="text-xs opacity-90">
                  {crypto.price
                    ? crypto.price >= 1000
                      ? `$${(crypto.price / 1000).toFixed(1)}k`
                      : crypto.price >= 1
                        ? `$${crypto.price.toFixed(2)}`
                        : `$${crypto.price.toFixed(4)}`
                    : "N/A"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-stroke pt-3 text-xs dark:border-strokedark">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-green-600"></div>
            <span className="text-bodydark">&gt;10%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-green-400"></div>
            <span className="text-bodydark">0-10%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-red-400 h-3 w-3 rounded"></div>
            <span className="text-bodydark">0 to -10%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-red-600 h-3 w-3 rounded"></div>
            <span className="text-bodydark">&lt;-10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
