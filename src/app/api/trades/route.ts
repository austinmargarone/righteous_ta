import { NextRequest, NextResponse } from "next/server";

const SYMBOL_TO_COINBASE: { [key: string]: string } = {
  BTCUSDT: "BTC-USD",
  ETHUSDT: "ETH-USD",
  BNBUSDT: "BNB-USD",
  SOLUSDT: "SOL-USD",
  ADAUSDT: "ADA-USD",
  XRPUSDT: "XRP-USD",
  DOGEUSDT: "DOGE-USD",
  DOTUSDT: "DOT-USD",
  MATICUSDT: "MATIC-USD",
  LTCUSDT: "LTC-USD",
  LINKUSDT: "LINK-USD",
  XMLUSDT: "XLM-USD",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol") || "BTCUSDT";
  const limit = parseInt(searchParams.get("limit") || "50");

  const coinbaseSymbol = SYMBOL_TO_COINBASE[symbol] || "BTC-USD";

  try {
    // Coinbase's trades endpoint
    const response = await fetch(
      `https://api.exchange.coinbase.com/products/${coinbaseSymbol}/trades?limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Coinbase API error: ${response.status}`);
    }

    const data = await response.json();

    // Convert Coinbase format to our format
    const trades = data.map((trade: any) => ({
      id: trade.trade_id,
      price: trade.price,
      qty: trade.size,
      time: new Date(trade.time).getTime(),
      isBuyerMaker: trade.side === "sell", // If side is "sell", buyer is the maker
    }));

    return NextResponse.json(trades);
  } catch (error: any) {
    console.error("Error fetching trades from Coinbase:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch trades" },
      { status: 500 },
    );
  }
}
