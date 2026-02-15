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
    return "text-black dark:text-white";
  };

  const getSize = (marketCap: number, allMarketCaps: number[]) => {
    const maxMC = Math.max(...allMarketCaps);
    const minMC = Math.min(...allMarketCaps);
    const normalized = (marketCap - minMC) / (maxMC - minMC);

    const minSize = 130;
    const maxSize = 200;
    return minSize + normalized * (maxSize - minSize);
  };

  const handleSymbolClick = (symbol: string) => {
    onSymbolClick(`${symbol}USDT`);
  };

  if (loading) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-center text-bodydark">
          Loading market heatmap...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-red-500 text-center">Error: {error}</div>
      </div>
    );
  }

  const allMarketCaps = cryptoData.map((c) => c.marketCap);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Market Heatmap
        </h3>
        <p className="text-sm text-bodydark">
          Tile height = market cap • Color = 24h change • Click to view chart
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {cryptoData.map((crypto) => {
            const size = getSize(crypto.marketCap, allMarketCaps);
            const color = getColor(crypto.priceChange24h);
            const textColor = getTextColor(crypto.priceChange24h);

            return (
              <button
                key={crypto.id}
                onClick={() => handleSymbolClick(crypto.symbol.toUpperCase())}
                className={`${color} ${textColor} relative flex flex-col items-center justify-center rounded-lg p-4 transition-all hover:scale-105 hover:shadow-lg`}
                style={{
                  height: `${size}px`,
                }}
                title={`${crypto.name} - Market Cap: $${(crypto.marketCap / 1e9).toFixed(2)}B`}
              >
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={10}
                  height={10} // e.g. 200 or 300
                  className="mb-2 h-10 w-10 rounded-full"
                  unoptimized
                />
                <div className="text-sm font-bold">
                  {crypto.symbol.toUpperCase()}
                </div>
                <div className="text-xl font-bold">
                  {crypto.priceChange24h > 0 ? "+" : ""}
                  {crypto.priceChange24h.toFixed(2)}%
                </div>
                <div className="text-xs font-semibold opacity-90">
                  {crypto.price
                    ? crypto.price >= 1000
                      ? `$${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                      : crypto.price >= 1
                        ? `$${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                        : `$${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}`
                    : "N/A"}
                </div>
                <div className="mt-1 text-xs opacity-75">
                  ${(crypto.marketCap / 1e9).toFixed(1)}B
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-600"></div>
            <span className="text-bodydark">&gt;10%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-400"></div>
            <span className="text-bodydark">0-10%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-400 h-4 w-4 rounded"></div>
            <span className="text-bodydark">0 to -10%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 h-4 w-4 rounded"></div>
            <span className="text-bodydark">&lt;-10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
