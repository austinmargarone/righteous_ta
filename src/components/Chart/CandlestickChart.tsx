"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  CandlestickData,
  HistogramData,
} from "lightweight-charts";

interface CandlestickChartProps {
  symbol?: string;
  interval?: string;
}

export default function CandlestickChart({
  symbol = "BTCUSDT",
  interval = "1h",
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        background: { color: "#0a0a0a" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1f1f1f" },
        horzLines: { color: "#1f1f1f" },
      },
      crosshair: {
        mode: 1,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    chart.priceScale("").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Fetch and auto-refresh data
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    const fetchHistoricalData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/klines?symbol=${symbol}&interval=${interval}&limit=500`,
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No data returned from API");
        }

        const candleData: CandlestickData[] = data.map((kline: any) => ({
          time: Math.floor(kline[0] / 1000) as Time,
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
        }));

        const volumeData: HistogramData[] = data.map((kline: any) => ({
          time: Math.floor(kline[0] / 1000) as Time,
          value: parseFloat(kline[5]),
          color:
            parseFloat(kline[4]) >= parseFloat(kline[1])
              ? "rgba(34, 197, 94, 0.5)"
              : "rgba(239, 68, 68, 0.5)",
        }));

        candleSeriesRef.current!.setData(candleData);
        volumeSeriesRef.current!.setData(volumeData);

        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load chart data");
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchHistoricalData();

    // Auto-refresh every 60 seconds
    const refreshInterval = setInterval(fetchHistoricalData, 60000);

    return () => clearInterval(refreshInterval);
  }, [symbol, interval]);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/50">
          <div className="text-lg text-white">Loading chart data...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/50">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      )}
      <div ref={chartContainerRef} className="rounded-lg" />
    </div>
  );
}
