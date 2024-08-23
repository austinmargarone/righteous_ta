"use client";
import { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  createdAt: string;
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    console.warn("createdAt is undefined or null");
    return "No date available";
  }

  console.log("Original createdAt string:", dateString);

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.warn(`Unable to parse createdAt: ${dateString}`);
    return dateString;
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("Formatted date:", formattedDate);
  return formattedDate;
}

export default function CryptoNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const responseData = await response.json();
        if (response.ok) {
          console.log("Received data:", JSON.stringify(responseData, null, 2));

          let newsData: NewsArticle[];
          if (responseData.data && Array.isArray(responseData.data.data)) {
            newsData = responseData.data.data;
          } else if (
            responseData.data &&
            typeof responseData.data === "object"
          ) {
            newsData = Object.values(responseData.data);
          } else {
            throw new Error("Invalid data format received");
          }

          if (newsData.length > 0) {
            console.log(
              "First news item structure:",
              JSON.stringify(newsData[0], null, 2),
            );
          }

          setNews(newsData);
        } else {
          throw new Error(responseData.error || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error in fetchNews:", err);
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (news.length === 0) {
    return <div>No news available</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        {news.map((article, index) => (
          <div key={index} className="rounded-sm bg-white p-4 shadow-lg">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2 className="mb-2 text-xl font-semibold text-black">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <p className="cursor-pointer text-blue-500 underline">
                Read more
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Date: {formatDate(article.createdAt)}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
