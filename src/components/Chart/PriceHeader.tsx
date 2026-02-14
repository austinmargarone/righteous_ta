"use client";

import { useEffect, useState } from "react";

interface PriceHeaderProps {
  symbol: string;
}

interface PriceData {
  price: string;
  change: string;
  changePercent: string;
}

export default function PriceHeader({ symbol }: PriceHeaderProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const symbolMap: { [key: string]: string } = {
          BTCUSDT: "BTC",
          ETHUSDT: "ETH",
          BNBUSDT: "BNB",
          SOLUSDT: "SOL",
          ADAUSDT: "ADA",
          XRPUSDT: "XRP",
          DOGEUSDT: "DOGE",
          DOTUSDT: "DOT",
          MATICUSDT: "MATIC",
          LTCUSDT: "LTC",
          LINKUSDT: "LINK",
          XMLUSDT: "XLM",
        };

        const fromSymbol = symbolMap[symbol] || "BTC";

        const response = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromSymbol}&tsyms=USD`,
        );

        const data = await response.json();
        const ticker = data.RAW?.[fromSymbol]?.USD;

        if (!ticker) return;

        const price = ticker.PRICE;
        const change = ticker.CHANGE24HOUR;
        const changePercent = ticker.CHANGEPCT24HOUR;

        setPriceData({
          price: price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          change: change.toFixed(2),
          changePercent: changePercent.toFixed(2),
        });

        setIsPositive(change >= 0);
      } catch (error) {
        console.error("Error fetching ticker:", error);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 10000);

    return () => clearInterval(interval);
  }, [symbol]);

  if (!priceData) return null;

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-bold text-black dark:text-white">
        ${priceData.price}
      </span>
      <span
        className={`text-sm font-semibold ${isPositive ? "text-meta-3" : "text-meta-1"}`}
      >
        {isPositive ? "+" : ""}
        {priceData.change} ({isPositive ? "+" : ""}
        {priceData.changePercent}%)
      </span>
    </div>
  );
}
