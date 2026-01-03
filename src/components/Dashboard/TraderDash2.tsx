"use client";

import { useState } from "react";
import CandlestickChart from "@/components/Chart/CandlestickChart";
import PriceHeader from "@/components/Chart/PriceHeader";
import TimeframeSelector from "@/components/Chart/TimeframeSelector";
import TokenomicsPanel from "../Chart/TokenomicsPanel";

export default function TraderDash2() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [selectedInterval, setSelectedInterval] = useState("1h");

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-stroke bg-white px-4 py-2 dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-6">
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="hover:bg-gray-100 rounded border-none bg-transparent px-2 py-1 text-lg font-bold text-black outline-none dark:text-white dark:hover:bg-meta-4"
          >
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="XRPUSDT">XRP/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
            <option value="SOLUSDT">SOL/USDT</option>
            <option value="ADAUSDT">ADA/USDT</option>
            <option value="DOGEUSDT">DOGE/USDT</option>
            <option value="LTCUSDT">LTC/USDT</option>
            <option value="LINKUSDT">LINK/USDT</option>
            <option value="DOTUSDT">DOT/USDT</option>
            <option value="MATICUSDT">MATIC/USDT</option>
            <option value="XMLUSDT">XLM/USDT</option>
          </select>

          <div className="hidden md:block">
            <PriceHeader symbol={selectedSymbol} />
          </div>
        </div>

        <TimeframeSelector
          selected={selectedInterval}
          onSelect={setSelectedInterval}
        />
      </div>

      {/* Main Content - Side by Side */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Tokenomics Panel - Left Side */}
        <div className="lg:col-span-1">
          <TokenomicsPanel symbol={selectedSymbol} />
        </div>

        {/* Chart - Right Side */}
        <div className="lg:col-span-3">
          <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <CandlestickChart
              symbol={selectedSymbol}
              interval={selectedInterval}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
