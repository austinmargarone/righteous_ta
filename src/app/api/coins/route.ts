import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maxCoins = parseInt(searchParams.get("max") || "100", 10);

  const apiKey = process.env.COINGECKO_DEMO_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  const baseParams = {
    order: "market_cap_desc",
    per_page: maxCoins,
    page: 1,
    sparkline: false,
    price_change_percentage: "24h",
    locale: "en",
  };

  const config = {
    headers: {
      "x-cg-demo-api-key": apiKey,
    },
  };

  try {
    // Fetch USD data
    const usdResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: { ...baseParams, vs_currency: "usd" },
        ...config,
      },
    );

    // Fetch BTC data
    const btcResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: { ...baseParams, vs_currency: "btc" },
        ...config,
      },
    );

    const mergedCoins = usdResponse.data.map((usdCoin: any, index: number) => {
      const btcCoin = btcResponse.data[index] || {};

      return {
        id: usdCoin.id, // uuid fallback
        name: usdCoin.name,
        symbol: usdCoin.symbol.toUpperCase(),
        price: usdCoin.current_price?.toString() || "0",
        btcPrice: btcCoin.current_price?.toString() || "0",
        iconUrl: usdCoin.image,
        marketCap: usdCoin.market_cap?.toString() || "0",
        change: usdCoin.price_change_percentage_24h || 0,
        rank: usdCoin.market_cap_rank?.toString() || (index + 1).toString(),
      };
    });

    return NextResponse.json({ coins: mergedCoins });
  } catch (error: any) {
    console.error(
      "CoinGecko API error:",
      error.response?.data || error.message,
    );
    const status = error.response?.status || 500;
    return NextResponse.json(
      { error: "Failed to fetch coin data", details: error.message },
      { status },
    );
  }
}
