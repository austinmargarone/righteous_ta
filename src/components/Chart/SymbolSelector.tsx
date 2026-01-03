"use client";

interface SymbolSelectorProps {
  selected: string;
  onSelect: (symbol: string) => void;
}

const POPULAR_SYMBOLS = [
  { display: "BTC/USDT", value: "BTCUSDT" },
  { display: "ETH/USDT", value: "ETHUSDT" },
  { display: "BNB/USDT", value: "BNBUSDT" },
  { display: "SOL/USDT", value: "SOLUSDT" },
  { display: "ADA/USDT", value: "ADAUSDT" },
  { display: "XRP/USDT", value: "XRPUSDT" },
  { display: "DOGE/USDT", value: "DOGEUSDT" },
  { display: "LTC/USDT", value: "LTCUSDT" },
  { display: "LINK/USDT", value: "LINKUSDT" },
  { display: "DOT/USDT", value: "DOTUSDT" },
  { display: "MATIC/USDT", value: "MATICUSDT" },
  { display: "XLM/USDT", value: "XMLUSDT" },
];

export default function SymbolSelector({
  selected,
  onSelect,
}: SymbolSelectorProps) {
  return (
    <div className="rounded-lg bg-zinc-900 p-4">
      <div className="mb-3 text-sm font-semibold text-zinc-400">
        Select Pair
      </div>
      <div className="grid grid-cols-2 gap-2">
        {POPULAR_SYMBOLS.map((symbol) => (
          <button
            key={symbol.value}
            onClick={() => onSelect(symbol.value)}
            className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
              selected === symbol.value
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {symbol.display}
          </button>
        ))}
      </div>
    </div>
  );
}
