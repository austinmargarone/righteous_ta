import CandlestickChart from "../Charts/CandlestickChart";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Your existing header/nav */}

      <div className="mt-6">
        <CandlestickChart symbol="BTCUSDT" interval="1h" />
      </div>

      {/* Your existing sidebar/footer */}
    </div>
  );
}
