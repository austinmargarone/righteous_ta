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
  const limit = parseInt(searchParams.get("limit") || "20");

  const coinbaseSymbol = SYMBOL_TO_COINBASE[symbol] || "BTC-USD";

  try {
    // Coinbase's order book endpoint (level 2)
    const response = await fetch(
      `https://api.exchange.coinbase.com/products/${coinbaseSymbol}/book?level=2`,
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

    // Coinbase returns bids and asks as arrays of [price, size, num-orders]
    // We only need price and size
    const bids: [string, string][] = data.bids
      .slice(0, limit)
      .map((bid: string[]) => [bid[0], bid[1]]);

    const asks: [string, string][] = data.asks
      .slice(0, limit)
      .map((ask: string[]) => [ask[0], ask[1]]);

    return NextResponse.json({ bids, asks });
  } catch (error: any) {
    console.error("Error fetching order book from Coinbase:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch order book" },
      { status: 500 },
    );
  }
}
