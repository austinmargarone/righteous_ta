export interface CoinData {
  id: string;
  name: string;
  symbol: string;
}

export interface ApiResponse {
  data?: CoinData;
  error?: string;
}
