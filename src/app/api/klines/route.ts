import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.CRYPTOCOMPARE_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol") || "BTCUSDT";
  const interval = searchParams.get("interval") || "1h";
  const limit = parseInt(searchParams.get("limit") || "500");

  try {
    // Map symbols to Cryptocompare format
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

    // Map intervals to Cryptocompare endpoints
    const intervalMap: {
      [key: string]: { endpoint: string; aggregate?: number };
    } = {
      "1m": { endpoint: "histominute", aggregate: 1 },
      "5m": { endpoint: "histominute", aggregate: 5 },
      "15m": { endpoint: "histominute", aggregate: 15 },
      "1h": { endpoint: "histohour", aggregate: 1 },
      "4h": { endpoint: "histohour", aggregate: 4 },
      "1d": { endpoint: "histoday", aggregate: 1 },
      "1w": { endpoint: "histoday", aggregate: 7 },
    };

    const fromSymbol = symbolMap[symbol] || "BTC";
    const { endpoint, aggregate } = intervalMap[interval] || intervalMap["1h"];

    console.log("🔄 Fetching from Cryptocompare:", fromSymbol, interval);

    const url = `https://min-api.cryptocompare.com/data/v2/${endpoint}?fsym=${fromSymbol}&tsym=USD&limit=${limit}${aggregate ? `&aggregate=${aggregate}` : ""}${API_KEY ? `&api_key=${API_KEY}` : ""}`;

    console.log("📡 API URL:", url.replace(API_KEY || "", "API_KEY_HIDDEN"));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Cryptocompare error:", response.status, errorText);
      throw new Error(`Cryptocompare API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.Response === "Error") {
      throw new Error(result.Message || "Cryptocompare API error");
    }

    const data = result.Data?.Data || [];

    // Transform Cryptocompare format to Binance-like format
    const binanceFormat = data.map((candle: any) => [
      candle.time * 1000, // Convert to milliseconds
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volumeto, // Volume in USD
    ]);

    console.log(
      "✅ Cryptocompare data received:",
      binanceFormat.length,
      "candles",
    );

    return NextResponse.json(binanceFormat);
  } catch (error: any) {
    console.error("❌ API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 },
    );
  }
}
