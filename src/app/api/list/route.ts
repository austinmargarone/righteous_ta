import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  const url =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&limit=10"; // Adjust the URL as needed
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data); // Log the data to see the structure
    const data = response.data;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from RapidAPI:", error);
    return NextResponse.json({ error: "Error fetching data" });
  }
}
