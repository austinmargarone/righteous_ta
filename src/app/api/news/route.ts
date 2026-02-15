// src/app/api/news/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.CRYPTOCOMPARE_API_KEY; // Get free key at cryptocompare.com
  const url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Apikey ${apiKey}`,
      },
    });

    // CryptoCompare returns fresh news multiple times per day
    const newsData = response.data.Data.map((article: any) => ({
      title: article.title,
      description: article.body,
      url: article.url,
      createdAt: new Date(article.published_on * 1000).toISOString(), // Convert Unix timestamp
      source: article.source,
      imageUrl: article.imageurl,
    }));

    return NextResponse.json({ data: { data: newsData } });
  } catch (error) {
    console.error("Error fetching from CryptoCompare:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
