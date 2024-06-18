"use client";
import { useEffect, useState } from "react";

export default function CryptoNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        if (response.ok) {
          if (Array.isArray(data.data)) {
            setNews(data.data);
          } else {
            setError("Invalid data format received"); // Handle unexpected API response structure
          }
        } else {
          setError(data.error || "Failed to fetch data"); // Set error message received from API response or a generic message
        }
      } catch (err) {
        setError("Error fetching data"); // Set a generic error message for fetch failure
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if news is an array and not empty
  if (!Array.isArray(news) || news.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Crypto News</h1>
      <div>
        {news.map((article, index) => (
          <div key={index} style={{ marginBottom: "20px" }}></div>
        ))}
      </div>
    </div>
  );
}
