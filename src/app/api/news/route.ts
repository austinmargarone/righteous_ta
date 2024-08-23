import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY_NEWS;
  const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/theguardian";

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
      },
    });

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error("Error fetching data from RapidAPI:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
