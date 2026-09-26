export interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  sparkline_in_7d: {
    price: number[]
  }
}

export interface ChartDataPoint {
  date: string
  price: number
}