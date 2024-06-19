export interface CoinList {
  id: string;
  name: string;
  symbol: string;
}

export interface ApiResponse {
  data?: CoinList;
  error?: string;
}
