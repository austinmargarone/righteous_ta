import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from RapidAPI:", error);
    return NextResponse.json({ error: "Error fetching data" });
  }
}
