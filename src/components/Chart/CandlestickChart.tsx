"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  CandlestickData,
  HistogramData,
  LineStyle,
  CrosshairMode,
  LineData,
  ColorType,
} from "lightweight-charts";
import { SMA, EMA, BollingerBands, RSI, MACD } from "technicalindicators";

interface CandlestickChartProps {
  symbol?: string;
  interval?: string;
}

type ChartType = "candlestick" | "heikinashi" | "line";
type Theme = "dark" | "light" | "custom";

interface ChartColors {
  background: string;
  text: string;
  grid: string;
  upColor: string;
  downColor: string;
}

const THEMES: Record<Theme, ChartColors> = {
  dark: {
    background: "#0a0a0a",
    text: "#d1d5db",
    grid: "#1f1f1f",
    upColor: "#22c55e",
    downColor: "#ef4444",
  },
  light: {
    background: "#ffffff",
    text: "#1f2937",
    grid: "#e5e7eb",
    upColor: "#16a34a",
    downColor: "#dc2626",
  },
  custom: {
    background: "#1a1a2e",
    text: "#eee",
    grid: "#16213e",
    upColor: "#00ff88",
    downColor: "#ff0055",
  },
};

export default function CandlestickChart({
  symbol = "BTCUSDT",
  interval = "1h",
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const rsiContainerRef = useRef<HTMLDivElement>(null);
  const macdContainerRef = useRef<HTMLDivElement>(null);

  const mainChartRef = useRef<IChartApi | null>(null);
  const rsiChartRef = useRef<IChartApi | null>(null);
  const macdChartRef = useRef<IChartApi | null>(null);

  const candleSeriesRef = useRef<any>(null);
  const lineSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);
  const sma20SeriesRef = useRef<any>(null);
  const sma50SeriesRef = useRef<any>(null);
  const ema12SeriesRef = useRef<any>(null);
  const ema26SeriesRef = useRef<any>(null);
  const bbUpperRef = useRef<any>(null);
  const bbMiddleRef = useRef<any>(null);
  const bbLowerRef = useRef<any>(null);

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [theme, setTheme] = useState<Theme>("dark");
  const [showGrid, setShowGrid] = useState(true);
  const [autoScale, setAutoScale] = useState(true);

  // Indicators state
  const [indicators, setIndicators] = useState({
    sma20: false,
    sma50: false,
    ema12: false,
    ema26: false,
    bollingerBands: false,
    volume: true,
    rsi: false,
    macd: false,
  });

  // Raw data storage
  const [rawData, setRawData] = useState<any[]>([]);

  // Calculate Heikin Ashi candles
  const calculateHeikinAshi = (data: any[]) => {
    const haData: CandlestickData[] = [];
    let prevHA: any = null;

    data.forEach((candle: any) => {
      const open = parseFloat(candle[1]);
      const high = parseFloat(candle[2]);
      const low = parseFloat(candle[3]);
      const close = parseFloat(candle[4]);

      const haClose = (open + high + low + close) / 4;
      const haOpen = prevHA
        ? (prevHA.open + prevHA.close) / 2
        : (open + close) / 2;
      const haHigh = Math.max(high, haOpen, haClose);
      const haLow = Math.min(low, haOpen, haClose);

      const ha: CandlestickData = {
        time: Math.floor(candle[0] / 1000) as Time,
        open: haOpen,
        high: haHigh,
        low: haLow,
        close: haClose,
      };

      haData.push(ha);
      prevHA = ha;
    });

    return haData;
  };

  // Initialize main chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const colors = THEMES[theme];

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
      },
      grid: {
        vertLines: {
          color: colors.grid,
          style: LineStyle.Solid,
          visible: showGrid,
        },
        horzLines: {
          color: colors.grid,
          style: LineStyle.Solid,
          visible: showGrid,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: "#758696",
          style: LineStyle.Dashed,
        },
        horzLine: {
          width: 1,
          color: "#758696",
          style: LineStyle.Dashed,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#2B2B43",
      },
      rightPriceScale: {
        borderColor: "#2B2B43",
        autoScale: autoScale,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderUpColor: colors.upColor,
      borderDownColor: colors.downColor,
      wickUpColor: colors.upColor,
      wickDownColor: colors.downColor,
      visible: chartType === "candlestick" || chartType === "heikinashi",
    });

    const lineSeries = chart.addLineSeries({
      color: colors.upColor,
      lineWidth: 2,
      visible: chartType === "line",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "",
      visible: indicators.volume,
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    // SMA indicators
    const sma20Series = chart.addLineSeries({
      color: "#2962FF",
      lineWidth: 2,
      visible: false,
    });

    const sma50Series = chart.addLineSeries({
      color: "#FF6D00",
      lineWidth: 2,
      visible: false,
    });

    // EMA indicators
    const ema12Series = chart.addLineSeries({
      color: "#9C27B0",
      lineWidth: 2,
      visible: false,
    });

    const ema26Series = chart.addLineSeries({
      color: "#E91E63",
      lineWidth: 2,
      visible: false,
    });

    // Bollinger Bands
    const bbUpper = chart.addLineSeries({
      color: "rgba(33, 150, 243, 0.5)",
      lineWidth: 1,
      visible: false,
    });

    const bbMiddle = chart.addLineSeries({
      color: "rgba(33, 150, 243, 0.8)",
      lineWidth: 1,
      visible: false,
    });

    const bbLower = chart.addLineSeries({
      color: "rgba(33, 150, 243, 0.5)",
      lineWidth: 1,
      visible: false,
    });

    mainChartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    lineSeriesRef.current = lineSeries;
    volumeSeriesRef.current = volumeSeries;
    sma20SeriesRef.current = sma20Series;
    sma50SeriesRef.current = sma50Series;
    ema12SeriesRef.current = ema12Series;
    ema26SeriesRef.current = ema26Series;
    bbUpperRef.current = bbUpper;
    bbMiddleRef.current = bbMiddle;
    bbLowerRef.current = bbLower;

    const handleResize = () => {
      if (chartContainerRef.current && mainChartRef.current) {
        mainChartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [theme, showGrid, autoScale, chartType, indicators.volume]);

  // Initialize RSI chart
  useEffect(() => {
    if (!rsiContainerRef.current || !indicators.rsi) return;

    const colors = THEMES[theme];

    const rsiChart = createChart(rsiContainerRef.current, {
      width: rsiContainerRef.current.clientWidth,
      height: 150,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
      },
      grid: {
        vertLines: { color: colors.grid, visible: showGrid },
        horzLines: { color: colors.grid, visible: showGrid },
      },
      timeScale: {
        visible: false,
        borderColor: "#2B2B43",
      },
      rightPriceScale: {
        borderColor: "#2B2B43",
      },
    });

    rsiChartRef.current = rsiChart;

    return () => {
      rsiChart.remove();
    };
  }, [indicators.rsi, theme, showGrid]);

  // Initialize MACD chart
  useEffect(() => {
    if (!macdContainerRef.current || !indicators.macd) return;

    const colors = THEMES[theme];

    const macdChart = createChart(macdContainerRef.current, {
      width: macdContainerRef.current.clientWidth,
      height: 150,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
      },
      grid: {
        vertLines: { color: colors.grid, visible: showGrid },
        horzLines: { color: colors.grid, visible: showGrid },
      },
      timeScale: {
        visible: false,
        borderColor: "#2B2B43",
      },
      rightPriceScale: {
        borderColor: "#2B2B43",
      },
    });

    macdChartRef.current = macdChart;

    return () => {
      macdChart.remove();
    };
  }, [indicators.macd, theme, showGrid]);

  // Update chart type visibility
  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.applyOptions({
        visible: chartType === "candlestick" || chartType === "heikinashi",
      });
    }
    if (lineSeriesRef.current) {
      lineSeriesRef.current.applyOptions({
        visible: chartType === "line",
      });
    }
  }, [chartType]);

  // Update indicator visibility
  useEffect(() => {
    if (sma20SeriesRef.current)
      sma20SeriesRef.current.applyOptions({ visible: indicators.sma20 });
    if (sma50SeriesRef.current)
      sma50SeriesRef.current.applyOptions({ visible: indicators.sma50 });
    if (ema12SeriesRef.current)
      ema12SeriesRef.current.applyOptions({ visible: indicators.ema12 });
    if (ema26SeriesRef.current)
      ema26SeriesRef.current.applyOptions({ visible: indicators.ema26 });
    if (volumeSeriesRef.current)
      volumeSeriesRef.current.applyOptions({ visible: indicators.volume });
    if (bbUpperRef.current)
      bbUpperRef.current.applyOptions({ visible: indicators.bollingerBands });
    if (bbMiddleRef.current)
      bbMiddleRef.current.applyOptions({ visible: indicators.bollingerBands });
    if (bbLowerRef.current)
      bbLowerRef.current.applyOptions({ visible: indicators.bollingerBands });
  }, [indicators]);

  // Fetch and process data
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

        setRawData(data);

        // Process candlestick data
        let candleData: CandlestickData[];
        if (chartType === "heikinashi") {
          candleData = calculateHeikinAshi(data);
        } else {
          candleData = data.map((kline: any) => ({
            time: Math.floor(kline[0] / 1000) as Time,
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
          }));
        }

        // Line chart data
        const lineData: LineData[] = data.map((kline: any) => ({
          time: Math.floor(kline[0] / 1000) as Time,
          value: parseFloat(kline[4]),
        }));

        // Volume data
        const volumeData: HistogramData[] = data.map((kline: any) => ({
          time: Math.floor(kline[0] / 1000) as Time,
          value: parseFloat(kline[5]),
          color:
            parseFloat(kline[4]) >= parseFloat(kline[1])
              ? "rgba(34, 197, 94, 0.5)"
              : "rgba(239, 68, 68, 0.5)",
        }));

        candleSeriesRef.current!.setData(candleData);
        lineSeriesRef.current!.setData(lineData);
        volumeSeriesRef.current!.setData(volumeData);

        // Calculate indicators
        const closes = data.map((k: any) => parseFloat(k[4]));
        const highs = data.map((k: any) => parseFloat(k[2]));
        const lows = data.map((k: any) => parseFloat(k[3]));
        const times = data.map((k: any) => Math.floor(k[0] / 1000) as Time);

        // SMA
        const sma20Values = SMA.calculate({ period: 20, values: closes });
        const sma50Values = SMA.calculate({ period: 50, values: closes });

        const sma20Data = times.slice(19).map((time: any, i: number) => ({
          time,
          value: sma20Values[i],
        }));

        const sma50Data = times.slice(49).map((time: any, i: number) => ({
          time,
          value: sma50Values[i],
        }));

        sma20SeriesRef.current!.setData(sma20Data);
        sma50SeriesRef.current!.setData(sma50Data);

        // EMA
        const ema12Values = EMA.calculate({ period: 12, values: closes });
        const ema26Values = EMA.calculate({ period: 26, values: closes });

        const ema12Data = times.slice(11).map((time: any, i: number) => ({
          time,
          value: ema12Values[i],
        }));

        const ema26Data = times.slice(25).map((time: any, i: number) => ({
          time,
          value: ema26Values[i],
        }));

        ema12SeriesRef.current!.setData(ema12Data);
        ema26SeriesRef.current!.setData(ema26Data);

        // Bollinger Bands
        const bbInput = {
          period: 20,
          values: closes,
          stdDev: 2,
        };
        const bbValues = BollingerBands.calculate(bbInput);

        const bbStartIndex = closes.length - bbValues.length;
        const bbUpper = times
          .slice(bbStartIndex)
          .map((time: any, i: number) => ({
            time,
            value: bbValues[i].upper,
          }));
        const bbMiddle = times
          .slice(bbStartIndex)
          .map((time: any, i: number) => ({
            time,
            value: bbValues[i].middle,
          }));
        const bbLower = times
          .slice(bbStartIndex)
          .map((time: any, i: number) => ({
            time,
            value: bbValues[i].lower,
          }));

        bbUpperRef.current!.setData(bbUpper);
        bbMiddleRef.current!.setData(bbMiddle);
        bbLowerRef.current!.setData(bbLower);

        // RSI
        if (indicators.rsi && rsiChartRef.current) {
          const rsiValues = RSI.calculate({ period: 14, values: closes });
          const rsiStartIndex = closes.length - rsiValues.length;

          const rsiSeries = rsiChartRef.current.addLineSeries({
            color: "#9C27B0",
            lineWidth: 2,
          });

          const rsiData = times
            .slice(rsiStartIndex)
            .map((time: any, i: number) => ({
              time,
              value: rsiValues[i],
            }));

          rsiSeries.setData(rsiData);

          // Add reference lines at 70 and 30
          const overbought = rsiChartRef.current.addLineSeries({
            color: "rgba(239, 68, 68, 0.5)",
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
          });

          const oversold = rsiChartRef.current.addLineSeries({
            color: "rgba(34, 197, 94, 0.5)",
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
          });

          overbought.setData(
            rsiData.map((d: { time: any }) => ({ time: d.time, value: 70 })),
          );
          oversold.setData(
            rsiData.map((d: { time: any }) => ({ time: d.time, value: 30 })),
          );
        }

        // MACD
        if (indicators.macd && macdChartRef.current) {
          const macdInput = {
            values: closes,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false,
          };

          const macdValues = MACD.calculate(macdInput);
          const macdStartIndex = closes.length - macdValues.length;

          const macdLine = macdChartRef.current.addLineSeries({
            color: "#2196F3",
            lineWidth: 2,
          });

          const signalLine = macdChartRef.current.addLineSeries({
            color: "#FF9800",
            lineWidth: 2,
          });

          const histogram = macdChartRef.current.addHistogramSeries({
            color: "#26a69a",
          });

          const macdData = times
            .slice(macdStartIndex)
            .map((time: any, i: number) => ({
              time,
              value: macdValues[i].MACD || 0,
            }));

          const signalData = times
            .slice(macdStartIndex)
            .map((time: any, i: number) => ({
              time,
              value: macdValues[i].signal || 0,
            }));

          const histData = times
            .slice(macdStartIndex)
            .map((time: any, i: number) => ({
              time,
              value: macdValues[i].histogram || 0,
              color:
                (macdValues[i].histogram || 0) >= 0
                  ? "rgba(34, 197, 94, 0.5)"
                  : "rgba(239, 68, 68, 0.5)",
            }));

          macdLine.setData(macdData);
          signalLine.setData(signalData);
          histogram.setData(histData);
        }

        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load chart data");
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
    const refreshInterval = setInterval(fetchHistoricalData, 60000);

    return () => clearInterval(refreshInterval);
  }, [symbol, interval, chartType, indicators.rsi, indicators.macd]);

  const toggleIndicator = (indicator: keyof typeof indicators) => {
    setIndicators((prev) => ({ ...prev, [indicator]: !prev[indicator] }));
  };

  const exportToPNG = () => {
    if (!mainChartRef.current) return;

    const canvas = chartContainerRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${symbol}_${interval}_${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const exportToCSV = () => {
    if (rawData.length === 0) return;

    const csv = [
      ["Timestamp", "Open", "High", "Low", "Close", "Volume"],
      ...rawData.map((k) => [
        new Date(k[0]).toISOString(),
        k[1],
        k[2],
        k[3],
        k[4],
        k[5],
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${symbol}_${interval}_${Date.now()}.csv`;
    link.href = url;
    link.click();
  };

  return (
    <div className="relative w-full space-y-4">
      {/* Minimalist Control Panel - Top Left */}
      <div className="absolute left-2 top-2 z-20 flex items-center gap-2">
        {/* Indicators Button */}
        <div className="group relative">
          <button className="flex items-center gap-1 rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-md hover:bg-white dark:bg-boxdark/90 dark:text-white dark:hover:bg-boxdark">
            <span>📊</span>
            <span>Indicators</span>
          </button>

          {/* Dropdown Menu */}
          <div className="invisible absolute left-0 top-full mt-1 w-48 rounded-lg border border-stroke bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-strokedark dark:bg-boxdark">
            <div className="mb-2 text-xs font-semibold text-bodydark">
              Trend
            </div>
            <div className="space-y-1">
              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.sma20}
                  onChange={() => toggleIndicator("sma20")}
                  className="h-3 w-3"
                />
                <span className="h-2 w-2 rounded-full bg-[#2962FF]"></span>
                <span>SMA 20</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.sma50}
                  onChange={() => toggleIndicator("sma50")}
                  className="h-3 w-3"
                />
                <span className="h-2 w-2 rounded-full bg-[#FF6D00]"></span>
                <span>SMA 50</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.ema12}
                  onChange={() => toggleIndicator("ema12")}
                  className="h-3 w-3"
                />
                <span className="h-2 w-2 rounded-full bg-[#9C27B0]"></span>
                <span>EMA 12</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.ema26}
                  onChange={() => toggleIndicator("ema26")}
                  className="h-3 w-3"
                />
                <span className="h-2 w-2 rounded-full bg-[#E91E63]"></span>
                <span>EMA 26</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.bollingerBands}
                  onChange={() => toggleIndicator("bollingerBands")}
                  className="h-3 w-3"
                />
                <span className="h-2 w-2 rounded-full bg-[#2196F3]"></span>
                <span>Bollinger Bands</span>
              </label>
            </div>

            <div className="my-2 border-t border-stroke dark:border-strokedark"></div>

            <div className="mb-2 text-xs font-semibold text-bodydark">
              Momentum
            </div>
            <div className="space-y-1">
              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.rsi}
                  onChange={() => toggleIndicator("rsi")}
                  className="h-3 w-3"
                />
                <span>RSI (14)</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.macd}
                  onChange={() => toggleIndicator("macd")}
                  className="h-3 w-3"
                />
                <span>MACD</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
                <input
                  type="checkbox"
                  checked={indicators.volume}
                  onChange={() => toggleIndicator("volume")}
                  className="h-3 w-3"
                />
                <span>Volume</span>
              </label>
            </div>
          </div>
        </div>

        {/* Chart Type */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ChartType)}
          className="rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-md hover:bg-white dark:bg-boxdark/90 dark:text-white dark:hover:bg-boxdark"
        >
          <option value="candlestick">🕯️ Candles</option>
          <option value="heikinashi">📊 Heikin Ashi</option>
          <option value="line">📈 Line</option>
        </select>

        {/* Settings Dropdown */}
        <div className="group relative">
          <button className="rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-md hover:bg-white dark:bg-boxdark/90 dark:text-white dark:hover:bg-boxdark">
            ⚙️
          </button>

          <div className="invisible absolute left-0 top-full mt-1 w-40 rounded-lg border border-stroke bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-strokedark dark:bg-boxdark">
            <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="h-3 w-3"
              />
              <span>Show Grid</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs hover:bg-gray-2 dark:hover:bg-meta-4">
              <input
                type="checkbox"
                checked={autoScale}
                onChange={(e) => setAutoScale(e.target.checked)}
                className="h-3 w-3"
              />
              <span>Auto Scale</span>
            </label>

            <div className="my-1 border-t border-stroke dark:border-strokedark"></div>

            <div className="px-2 py-1 text-xs font-semibold text-bodydark">
              Theme
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="w-full rounded bg-transparent px-2 py-1 text-xs"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Export Dropdown */}
        <div className="group relative">
          <button className="rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-md hover:bg-white dark:bg-boxdark/90 dark:text-white dark:hover:bg-boxdark">
            💾
          </button>

          <div className="invisible absolute left-0 top-full mt-1 w-36 rounded-lg border border-stroke bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-strokedark dark:bg-boxdark">
            <button
              onClick={exportToPNG}
              className="w-full rounded px-2 py-1.5 text-left text-xs hover:bg-gray-2 dark:hover:bg-meta-4"
            >
              📸 Save as PNG
            </button>
            <button
              onClick={exportToCSV}
              className="w-full rounded px-2 py-1.5 text-left text-xs hover:bg-gray-2 dark:hover:bg-meta-4"
            >
              📄 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Loading/Error */}
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

      {/* Main Chart */}
      <div ref={chartContainerRef} className="rounded-lg" />

      {/* RSI Chart */}
      {indicators.rsi && (
        <div className="mt-2">
          <div className="mb-1 px-2 text-xs font-semibold text-black dark:text-white">
            RSI (14)
          </div>
          <div ref={rsiContainerRef} className="rounded-lg" />
        </div>
      )}

      {/* MACD Chart */}
      {indicators.macd && (
        <div className="mt-2">
          <div className="mb-1 px-2 text-xs font-semibold text-black dark:text-white">
            MACD (12, 26, 9)
          </div>
          <div ref={macdContainerRef} className="rounded-lg" />
        </div>
      )}
    </div>
  );
}
