"use client";

interface TimeframeSelectorProps {
  selected: string;
  onSelect: (timeframe: string) => void;
}

const TIMEFRAMES = [
  { label: "1H", value: "1h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
];

export default function TimeframeSelector({
  selected,
  onSelect,
}: TimeframeSelectorProps) {
  return (
    <div className="flex gap-2">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf.value}
          onClick={() => onSelect(tf.value)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
            selected === tf.value
              ? "bg-primary text-white"
              : "bg-gray text-black hover:bg-primary hover:text-white dark:bg-meta-4 dark:text-white dark:hover:bg-primary"
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}
