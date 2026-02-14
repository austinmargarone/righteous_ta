"use client";

import { useEffect, useState } from "react";

interface TokenomicsPanelProps {
  symbol: string;
}

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number;
  ath: number;
  athChangePercent: number;
  atl: number;
  atlChangePercent: number;
  marketCapRank: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCapChange24h: number;
  marketCapChangePercent24h: number;
  fullyDilutedValuation: number;
  image: string;
}

const SYMBOL_TO_COINGECKO: { [key: string]: string } = {
  BTCUSDT: "bitcoin",
  ETHUSDT: "ethereum",
  BNBUSDT: "binancecoin",
  SOLUSDT: "solana",
  ADAUSDT: "cardano",
  XRPUSDT: "ripple",
  DOGEUSDT: "dogecoin",
  DOTUSDT: "polkadot",
  MATICUSDT: "matic-network",
  LTCUSDT: "litecoin",
  LINKUSDT: "chainlink",
  XMLUSDT: "stellar",
};

export default function TokenomicsPanel({ symbol }: TokenomicsPanelProps) {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenomics = async () => {
      try {
        setLoading(true);
        setError(null);

        const coinId = SYMBOL_TO_COINGECKO[symbol] || "bitcoin";

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tokenomics data");
        }

        const result = await response.json();

        setData({
          name: result.name,
          symbol: result.symbol.toUpperCase(),
          price: result.market_data.current_price.usd,
          marketCap: result.market_data.market_cap.usd,
          volume24h: result.market_data.total_volume.usd,
          circulatingSupply: result.market_data.circulating_supply,
          maxSupply: result.market_data.max_supply,
          ath: result.market_data.ath.usd,
          athChangePercent: result.market_data.ath_change_percentage.usd,
          atl: result.market_data.atl.usd,
          atlChangePercent: result.market_data.atl_change_percentage.usd,
          marketCapRank: result.market_cap_rank,
          priceChange24h: result.market_data.price_change_24h,
          priceChangePercent24h: result.market_data.price_change_percentage_24h,
          marketCapChange24h: result.market_data.market_cap_change_24h,
          marketCapChangePercent24h:
            result.market_data.market_cap_change_percentage_24h,
          fullyDilutedValuation:
            result.market_data.fully_diluted_valuation?.usd || 0,
          image: result.image.large,
        });

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching tokenomics:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTokenomics();
    // Refresh every 2 minutes
    const interval = setInterval(fetchTokenomics, 120000);

    return () => clearInterval(interval);
  }, [symbol]);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (!num) return "N/A";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(decimals)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatSupply = (num: number) => {
    if (!num) return "N/A";
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
  };

  if (loading) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-center text-bodydark">Loading tokenomics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-red-500 text-center">
          Failed to load tokenomics data
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={data.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white">
              {data.name}
            </h3>
            <p className="text-sm text-bodydark">
              {data.symbol} • Rank #{data.marketCapRank}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Market Cap */}
          <div>
            <p className="text-sm text-bodydark">Market Cap</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {formatNumber(data.marketCap)}
            </p>
            <p
              className={`text-xs ${data.marketCapChangePercent24h >= 0 ? "text-meta-3" : "text-meta-1"}`}
            >
              {data.marketCapChangePercent24h >= 0 ? "+" : ""}
              {data.marketCapChangePercent24h.toFixed(2)}% (24h)
            </p>
          </div>

          {/* 24h Volume */}
          <div>
            <p className="text-sm text-bodydark">24h Volume</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {formatNumber(data.volume24h)}
            </p>
            <p className="text-xs text-bodydark">
              Vol/MCap: {((data.volume24h / data.marketCap) * 100).toFixed(2)}%
            </p>
          </div>

          {/* Circulating Supply */}
          <div>
            <p className="text-sm text-bodydark">Circulating Supply</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {formatSupply(data.circulatingSupply)} {data.symbol}
            </p>
            {data.maxSupply && (
              <p className="text-xs text-bodydark">
                {((data.circulatingSupply / data.maxSupply) * 100).toFixed(1)}%
                of max
              </p>
            )}
          </div>

          {/* Max Supply */}
          <div>
            <p className="text-sm text-bodydark">Max Supply</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {data.maxSupply
                ? `${formatSupply(data.maxSupply)} ${data.symbol}`
                : "∞ Unlimited"}
            </p>
          </div>

          {/* Fully Diluted Valuation */}
          {data.fullyDilutedValuation > 0 && (
            <div>
              <p className="text-sm text-bodydark">Fully Diluted Valuation</p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {formatNumber(data.fullyDilutedValuation)}
              </p>
            </div>
          )}

          {/* ATH */}
          <div>
            <p className="text-sm text-bodydark">All-Time High</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {formatNumber(data.ath, 2)}
            </p>
            <p
              className={`text-xs ${data.athChangePercent >= 0 ? "text-meta-3" : "text-meta-1"}`}
            >
              {data.athChangePercent >= 0 ? "+" : ""}
              {data.athChangePercent.toFixed(2)}% from ATH
            </p>
          </div>

          {/* ATL */}
          <div>
            <p className="text-sm text-bodydark">All-Time Low</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {formatNumber(data.atl, 2)}
            </p>
            <p
              className={`text-xs ${data.atlChangePercent >= 0 ? "text-meta-3" : "text-meta-1"}`}
            >
              +{data.atlChangePercent.toFixed(2)}% from ATL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
