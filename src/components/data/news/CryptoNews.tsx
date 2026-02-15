"use client";
import { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  createdAt: string;
}

function formatRelativeTime(dateString: string | undefined): string {
  if (!dateString) return "No date available";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CryptoNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const responseData = await response.json();
        if (response.ok) {
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

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-body dark:text-bodydark">
            Loading latest crypto news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-danger p-6 text-center">
          <h3 className="mt-2 text-lg font-semibold text-danger">
            Failed to Load News
          </h3>
          <p className="mt-1 text-sm text-body dark:text-bodydark">{error}</p>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mt-4 text-body dark:text-bodydark">
            No news articles available
          </p>
        </div>
      </div>
    );
  }

  const visibleNews = news.slice(0, visibleCount);
  const hasMore = visibleCount < news.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Cryptocurrency News
        </h1>
        <p className="mt-2 text-body dark:text-bodydark">
          Latest updates from The Guardian
        </p>
      </div>

      {visibleNews.length > 0 && (
        <div className="mb-8">
          <a
            href={visibleNews[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="overflow-hidden rounded-lg border border-stroke bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-strokedark dark:bg-boxdark md:p-8">
              <div className="mb-3 flex items-center gap-2 text-sm">
                <span className="rounded-full bg-primary px-3 py-1 font-medium text-white">
                  Featured
                </span>
                <span className="text-bodydark2 dark:text-bodydark">
                  {formatRelativeTime(visibleNews[0].createdAt)}
                </span>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-black group-hover:text-primary dark:text-white dark:group-hover:text-primary md:text-3xl">
                {visibleNews[0].title}
              </h2>
              <p className="mb-4 text-base text-body dark:text-bodydark md:text-lg">
                {visibleNews[0].description}
              </p>
              <span className="font-medium text-primary">
                Read full article →
              </span>
            </div>
          </a>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleNews.slice(1).map((article, index) => (
          <a
            key={index + 1}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="h-full rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-lg dark:border-strokedark dark:bg-boxdark">
              <div className="mb-3 text-xs text-bodydark2 dark:text-bodydark">
                {formatRelativeTime(article.createdAt)}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-black group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mb-4 text-sm text-body dark:text-bodydark">
                {article.description.length > 150
                  ? article.description.substring(0, 150) + "..."
                  : article.description}
              </p>
              <span className="text-sm font-medium text-primary">
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            className="rounded-lg border border-stroke bg-white px-6 py-3 font-medium text-black transition-all hover:bg-gray-2 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4"
          >
            Load More Articles
          </button>
          <p className="mt-2 text-sm text-bodydark2 dark:text-bodydark">
            Showing {visibleCount} of {news.length} articles
          </p>
        </div>
      )}
    </div>
  );
}
