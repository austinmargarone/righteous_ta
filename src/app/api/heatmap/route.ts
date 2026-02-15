// app/api/heatmap/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Specific coins we want to display
    const coinIds = [
      "bitcoin",
      "ethereum",
      "binancecoin",
      "solana",
      "cardano",
      "ripple",
      "dogecoin",
      "polkadot",
      "matic-network",
      "litecoin",
      "chainlink",
      "stellar",
    ];

    // Fetch specific coins from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_DEMO_KEY || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data to our format
    const heatmapData = data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.current_price,
      priceChange24h: coin.price_change_percentage_24h || 0,
      marketCap: coin.market_cap,
      image: coin.image,
    }));

    return NextResponse.json(heatmapData);
  } catch (error: any) {
    console.error("Error fetching heatmap data:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch heatmap data" },
      { status: 500 },
    );
  }
}
