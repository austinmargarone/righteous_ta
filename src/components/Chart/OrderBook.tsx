"use client";

import { useEffect, useState } from "react";

interface OrderBookProps {
  symbol: string;
}

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

interface Trade {
  id: number;
  price: number;
  quantity: number;
  time: number;
  isBuyerMaker: boolean;
}

export default function OrderBook({ symbol = "BTCUSDT" }: OrderBookProps) {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [spread, setSpread] = useState({ absolute: 0, percentage: 0 });
  const [depthLimit, setDepthLimit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"book" | "trades" | "depth">(
    "book",
  );

  // Fetch order book data
  useEffect(() => {
    // Process order book data inside useEffect
    const processOrderBook = (
      orders: [string, string][],
      isBid: boolean,
    ): OrderBookEntry[] => {
      let total = 0;
      return orders.slice(0, depthLimit).map(([price, qty]) => {
        const p = parseFloat(price);
        const q = parseFloat(qty);
        total += q;
        return { price: p, quantity: q, total };
      });
    };

    const fetchOrderBook = async () => {
      try {
        console.log("Fetching order book for", symbol);
        const response = await fetch(
          `/api/orderbook?symbol=${symbol}&limit=${depthLimit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`Failed to fetch order book: ${response.status}`);
        }

        const data = await response.json();
        console.log("Order book data received:", data);

        if (!data.bids || !data.asks) {
          throw new Error("Invalid order book data format");
        }

        const processedBids = processOrderBook(data.bids, true);
        const processedAsks = processOrderBook(data.asks, false);

        setBids(processedBids);
        setAsks(processedAsks);

        // Calculate spread
        if (processedAsks.length > 0 && processedBids.length > 0) {
          const bestAsk = processedAsks[0].price;
          const bestBid = processedBids[0].price;
          const spreadAbs = bestAsk - bestBid;
          const spreadPct = (spreadAbs / bestBid) * 100;

          setSpread({
            absolute: spreadAbs,
            percentage: spreadPct,
          });
        }

        setLoading(false);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching order book:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 2000);

    return () => clearInterval(interval);
  }, [symbol, depthLimit]);

  // Fetch recent trades
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        console.log("Fetching trades for", symbol);
        const response = await fetch(`/api/trades?symbol=${symbol}&limit=50`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Trades fetch failed:", response.status);
          return;
        }

        const data = await response.json();
        console.log("Trades data received:", data.length, "trades");

        const trades: Trade[] = data.map((trade: any) => ({
          id: trade.id,
          price: parseFloat(trade.price),
          quantity: parseFloat(trade.qty),
          time: trade.time,
          isBuyerMaker: trade.isBuyerMaker,
        }));

        setRecentTrades(trades);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toFixed(2);
    if (price >= 1) return price.toFixed(4);
    return price.toFixed(6);
  };

  const formatQuantity = (qty: number) => {
    if (qty >= 1000) return qty.toFixed(2);
    if (qty >= 1) return qty.toFixed(4);
    return qty.toFixed(6);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Calculate max total for depth visualization
  const maxBidTotal = bids.length > 0 ? bids[bids.length - 1].total : 0;
  const maxAskTotal = asks.length > 0 ? asks[asks.length - 1].total : 0;
  const maxTotal = Math.max(maxBidTotal, maxAskTotal);

  if (loading) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-center">
          <div className="text-bodydark">Loading order book...</div>
          <div className="mt-2 text-xs text-bodydark">
            Check browser console for errors
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error: {error}</div>
          <div className="text-xs text-bodydark">
            Make sure API routes are created at:
            <br />
            • app/api/orderbook/route.ts
            <br />• app/api/trades/route.ts
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke px-4 py-3 dark:border-strokedark">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Order Book
          </h3>

          <select
            value={depthLimit}
            onChange={(e) => setDepthLimit(Number(e.target.value))}
            className="rounded border border-stroke bg-transparent px-2 py-1 text-xs dark:border-strokedark"
          >
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={25}>25</option>
          </select>
        </div>

        {/* Spread Info */}
        <div className="mt-2 flex items-center gap-4 text-xs">
          <div>
            <span className="text-bodydark">Spread: </span>
            <span className="font-semibold text-black dark:text-white">
              {formatPrice(spread.absolute)}
            </span>
          </div>
          <div>
            <span className="text-bodydark">Spread %: </span>
            <span className="font-semibold text-black dark:text-white">
              {spread.percentage.toFixed(3)}%
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stroke dark:border-strokedark">
        <button
          onClick={() => setActiveTab("book")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "book"
              ? "border-b-2 border-primary text-primary"
              : "text-bodydark hover:text-black dark:hover:text-white"
          }`}
        >
          Order Book
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "trades"
              ? "border-b-2 border-primary text-primary"
              : "text-bodydark hover:text-black dark:hover:text-white"
          }`}
        >
          Recent Trades
        </button>
        <button
          onClick={() => setActiveTab("depth")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "depth"
              ? "border-b-2 border-primary text-primary"
              : "text-bodydark hover:text-black dark:hover:text-white"
          }`}
        >
          Depth Chart
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "book" && (
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-bodydark">
              <div className="text-left">Price (USDT)</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Total</div>
            </div>

            {/* Asks (Sell Orders) */}
            <div className="space-y-0.5">
              {[...asks].reverse().map((ask, index) => {
                const depthPercentage = (ask.total / maxTotal) * 100;
                return (
                  <div
                    key={`ask-${index}`}
                    className="hover:bg-gray-1 relative grid grid-cols-3 gap-2 py-1 text-xs dark:hover:bg-meta-4"
                  >
                    <div
                      className="bg-red-500/10 absolute right-0 top-0 h-full"
                      style={{ width: `${depthPercentage}%` }}
                    />
                    <div className="font-mono text-red-500 relative z-10 text-left">
                      {formatPrice(ask.price)}
                    </div>
                    <div className="font-mono relative z-10 text-right text-black dark:text-white">
                      {formatQuantity(ask.quantity)}
                    </div>
                    <div className="font-mono relative z-10 text-right text-bodydark">
                      {formatQuantity(ask.total)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spread Line */}
            <div className="border-t-2 border-dashed border-stroke py-2 text-center dark:border-strokedark">
              <span className="text-lg font-bold text-black dark:text-white">
                {asks.length > 0 ? formatPrice(asks[0].price) : "—"}
              </span>
              <span className="ml-2 text-xs text-bodydark">Last Price</span>
            </div>

            {/* Bids (Buy Orders) */}
            <div className="space-y-0.5">
              {bids.map((bid, index) => {
                const depthPercentage = (bid.total / maxTotal) * 100;
                return (
                  <div
                    key={`bid-${index}`}
                    className="hover:bg-gray-1 relative grid grid-cols-3 gap-2 py-1 text-xs dark:hover:bg-meta-4"
                  >
                    <div
                      className="absolute right-0 top-0 h-full bg-green-500/10"
                      style={{ width: `${depthPercentage}%` }}
                    />
                    <div className="font-mono relative z-10 text-left text-green-500">
                      {formatPrice(bid.price)}
                    </div>
                    <div className="font-mono relative z-10 text-right text-black dark:text-white">
                      {formatQuantity(bid.quantity)}
                    </div>
                    <div className="font-mono relative z-10 text-right text-bodydark">
                      {formatQuantity(bid.total)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "trades" && (
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-bodydark">
              <div className="text-left">Price (USDT)</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Time</div>
            </div>

            {/* Trades List */}
            <div className="max-h-[600px] space-y-0.5 overflow-y-auto">
              {recentTrades.length > 0 ? (
                recentTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="hover:bg-gray-1 grid grid-cols-3 gap-2 py-1 text-xs dark:hover:bg-meta-4"
                  >
                    <div
                      className={`font-mono text-left ${
                        trade.isBuyerMaker ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {formatPrice(trade.price)}
                    </div>
                    <div className="font-mono text-right text-black dark:text-white">
                      {formatQuantity(trade.quantity)}
                    </div>
                    <div className="font-mono text-right text-bodydark">
                      {formatTime(trade.time)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-bodydark">
                  Loading trades...
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "depth" && (
          <div className="space-y-4">
            <div className="text-center text-sm text-bodydark">
              Market Depth Visualization
            </div>

            {/* Depth Chart */}
            <div className="relative h-80">
              <svg className="h-full w-full" viewBox="0 0 800 300">
                {/* Grid lines */}
                <line
                  x1="400"
                  y1="0"
                  x2="400"
                  y2="300"
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="800"
                  y2="150"
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="4"
                />

                {/* Bids (left side - green) */}
                {bids.map((bid, index) => {
                  const x = 400 - (index / depthLimit) * 400;
                  const height = (bid.total / maxTotal) * 280;
                  const y = 300 - height;

                  return (
                    <rect
                      key={`bid-bar-${index}`}
                      x={x - 400 / depthLimit}
                      y={y}
                      width={400 / depthLimit}
                      height={height}
                      fill="rgba(34, 197, 94, 0.3)"
                      stroke="rgba(34, 197, 94, 0.8)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Asks (right side - red) */}
                {asks.map((ask, index) => {
                  const x = 400 + (index / depthLimit) * 400;
                  const height = (ask.total / maxTotal) * 280;
                  const y = 300 - height;

                  return (
                    <rect
                      key={`ask-bar-${index}`}
                      x={x}
                      y={y}
                      width={400 / depthLimit}
                      height={height}
                      fill="rgba(239, 68, 68, 0.3)"
                      stroke="rgba(239, 68, 68, 0.8)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Labels */}
                <text
                  x="200"
                  y="290"
                  fill="#9CA3AF"
                  fontSize="12"
                  textAnchor="middle"
                >
                  Bids
                </text>
                <text
                  x="600"
                  y="290"
                  fill="#9CA3AF"
                  fontSize="12"
                  textAnchor="middle"
                >
                  Asks
                </text>
                <text
                  x="400"
                  y="15"
                  fill="#9CA3AF"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {bids.length > 0 && asks.length > 0
                    ? `${formatPrice(bids[0].price)} | ${formatPrice(asks[0].price)}`
                    : "—"}
                </text>
              </svg>
            </div>

            {/* Liquidity Stats */}
            <div className="grid grid-cols-2 gap-4 rounded border border-stroke p-3 dark:border-strokedark">
              <div>
                <div className="text-xs text-bodydark">Total Bid Liquidity</div>
                <div className="text-lg font-semibold text-green-500">
                  {formatQuantity(maxBidTotal)}
                </div>
              </div>
              <div>
                <div className="text-xs text-bodydark">Total Ask Liquidity</div>
                <div className="text-red-500 text-lg font-semibold">
                  {formatQuantity(maxAskTotal)}
                </div>
              </div>
              <div>
                <div className="text-xs text-bodydark">Bid/Ask Ratio</div>
                <div className="text-lg font-semibold text-black dark:text-white">
                  {maxAskTotal > 0
                    ? (maxBidTotal / maxAskTotal).toFixed(2)
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-bodydark">Market Imbalance</div>
                <div
                  className={`text-lg font-semibold ${
                    maxBidTotal > maxAskTotal
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {maxBidTotal > maxAskTotal ? "Buy Pressure" : "Sell Pressure"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
