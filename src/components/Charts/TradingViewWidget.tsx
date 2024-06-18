"use client";
import React, { useEffect, useRef, memo } from "react";
import useColorMode from "@/hooks/useColorMode"; // Import the useColorMode hook

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [colorMode] = useColorMode();

  useEffect(() => {
    const loadScript = () => {
      // Remove existing script if it exists
      if (scriptRef.current) {
        const currentScript = scriptRef.current;
        currentScript.parentNode?.removeChild(currentScript);
      }

      // Create new script element with updated theme based on color mode
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "timezone": "Etc/UTC",
          "theme": "${colorMode === "dark" ? "dark" : "light"}", 
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

      // Append the new script to the container
      const currentContainer = container.current;
      if (currentContainer) {
        currentContainer.appendChild(script);
        scriptRef.current = script;
      }
    };

    // Load script initially
    loadScript();

    return () => {
      // Cleanup function
      if (scriptRef.current) {
        const currentScript = scriptRef.current;
        currentScript.parentNode?.removeChild(currentScript);
      }
    };
  }, [colorMode]); // Re-run effect when color mode changes

  return <div className="h-full w-full" ref={container}></div>;
}

export default memo(TradingViewWidget);
