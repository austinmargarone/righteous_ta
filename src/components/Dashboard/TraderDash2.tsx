"use client";

import { useState } from "react";
import CandlestickChart from "@/components/Chart/CandlestickChart";
import PriceHeader from "@/components/Chart/PriceHeader";
import TimeframeSelector from "@/components/Chart/TimeframeSelector";
import SymbolSelector from "@/components/Chart/SymbolSelector";

export default function TraderDash2() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [selectedInterval, setSelectedInterval] = useState("1h");

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar - Symbol Selector & Timeframes */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Left Side - Symbol Selector */}
        <div className="flex items-center gap-4">
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="rounded border border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
            <option value="SOLUSDT">SOL/USDT</option>
            <option value="ADAUSDT">ADA/USDT</option>
            <option value="XRPUSDT">XRP/USDT</option>
          </select>

          {/* Current Price - Inline */}
          <div className="hidden md:block">
            <PriceHeader symbol={selectedSymbol} />
          </div>
        </div>

        {/* Right Side - Timeframe Selector */}
        <TimeframeSelector
          selected={selectedInterval}
          onSelect={setSelectedInterval}
        />
      </div>

      {/* Mobile Price Header */}
      <div className="mb-4 md:hidden">
        <PriceHeader symbol={selectedSymbol} />
      </div>

      {/* Full-Screen Chart */}
      <div className="flex-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CandlestickChart symbol={selectedSymbol} interval={selectedInterval} />
      </div>
    </div>
  );
}
