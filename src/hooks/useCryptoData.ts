import { useState, useEffect } from 'react'
import type { CryptoData, ChartDataPoint } from '../types/crypto'

export type TimePeriod = '1' | '7' | '30' | '365'

const API_BASE = 'https://api.coingecko.com/api/v3'

const FALLBACK_COINS: CryptoData[] = [
  { 
    id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', 
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', 
    current_price: 67432.10, market_cap: 1320000000000, total_volume: 28000000000, 
    price_change_percentage_24h: 2.14, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'ethereum', symbol: 'eth', name: 'Ethereum', 
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', 
    current_price: 3521.45, market_cap: 420000000000, total_volume: 15000000000, 
    price_change_percentage_24h: -0.85, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'solana', symbol: 'sol', name: 'Solana', 
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', 
    current_price: 145.30, market_cap: 65000000000, total_volume: 3200000000, 
    price_change_percentage_24h: 5.42, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'binancecoin', symbol: 'bnb', name: 'BNB', 
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', 
    current_price: 590.12, market_cap: 87000000000, total_volume: 1200000000, 
    price_change_percentage_24h: 1.05, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'ripple', symbol: 'xrp', name: 'XRP', 
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', 
    current_price: 0.62, market_cap: 34000000000, total_volume: 1100000000, 
    price_change_percentage_24h: -1.20, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'cardano', symbol: 'ada', name: 'Cardano', 
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', 
    current_price: 0.45, market_cap: 16000000000, total_volume: 400000000, 
    price_change_percentage_24h: 0.75, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', 
    image: 'https://assets.coingecko.com/coins/images/12559/large/avalanche-logo.png', 
    current_price: 35.80, market_cap: 13000000000, total_volume: 500000000, 
    price_change_percentage_24h: 3.10, sparkline_in_7d: { price: [] }
  },
  { 
    id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', 
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', 
    current_price: 0.16, market_cap: 23000000000, total_volume: 1500000000, 
    price_change_percentage_24h: -2.30, sparkline_in_7d: { price: [] }
  },
]

const generateFallbackChart = (days: string): ChartDataPoint[] => {
  const data: ChartDataPoint[] = []
  const points = days === '1' ? 24 : days === '7' ? 7 : days === '30' ? 30 : 12
  let price = 65000
  
  for (let i = 0; i < points; i++) {
    price = price + (Math.random() - 0.48) * (days === '1' ? 500 : 2000)
    const date = new Date()
    date.setDate(date.getDate() - (points - i))
    data.push({
      date: date.toLocaleDateString('ru-RU', { 
        month: 'short', 
        day: 'numeric',
        hour: days === '1' ? '2-digit' : undefined,
        minute: days === '1' ? '2-digit' : undefined
      }),
      price: Number(price.toFixed(2)),
    })
  }
  return data
}

export function useCryptoData() {
  const [coins, setCoins] = useState<CryptoData[]>(FALLBACK_COINS)
  const [chartData, setChartData] = useState<ChartDataPoint[]>(generateFallbackChart('7'))
  const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7')
  const [loading, setLoading] = useState(false) 
  const [chartLoading, setChartLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`
        )
        if (!response.ok) throw new Error('API error')
        const data = await response.json()
        setCoins(data)
        console.log('✅ Реальные данные загружены')
      } catch (error) {
        console.warn('⚠️ Используем резервные данные')
        setCoins(FALLBACK_COINS)
      }
    }

    fetchCoins()
    const interval = setInterval(fetchCoins, 120000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setChartLoading(true)
        const response = await fetch(
          `${API_BASE}/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${selectedPeriod}`
        )
        if (!response.ok) throw new Error('API error')
        const data = await response.json()
        
        const formattedData: ChartDataPoint[] = data.prices.map((item: [number, number]) => ({
          date: new Date(item[0]).toLocaleDateString('ru-RU', { 
            month: 'short', 
            day: 'numeric',
            hour: selectedPeriod === '1' ? '2-digit' : undefined,
            minute: selectedPeriod === '1' ? '2-digit' : undefined
          }),
          price: item[1],
        }))
        setChartData(formattedData)
      } catch (error) {
        console.warn('⚠️ Используем резервный график')
        setChartData(generateFallbackChart(selectedPeriod))
      } finally {
        setChartLoading(false)
      }
    }

    fetchChartData()
  }, [selectedCoin, selectedPeriod])

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return {
    coins: filteredCoins,
    chartData,
    selectedCoin,
    setSelectedCoin,
    selectedPeriod,
    setSelectedPeriod,
    loading,
    chartLoading,
    searchQuery,
    setSearchQuery,
  }
}