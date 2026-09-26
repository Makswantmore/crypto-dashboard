import { useState, useEffect, useCallback } from 'react'
import type { CryptoData, ChartDataPoint } from '../types/crypto'

const API_BASE = 'https://api.coingecko.com/api/v3'

export type TimePeriod = '1' | '7' | '30' | '365'

export function useCryptoData() {
  const [coins, setCoins] = useState<CryptoData[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin')
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7')
  const [loading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchCoins = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`
      )
      const data = await res.json()
      setCoins(data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch coins:', err)
      setLoading(false)
    }
  }, [])

  const fetchChartData = useCallback(async (coinId: string, days: TimePeriod) => {
    setChartLoading(true)
    try {
      const res = await fetch(
        `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      )
      const data = await res.json()
      
      const formatted: ChartDataPoint[] = data.prices.map(
        ([timestamp, price]: [number, number]) => ({
          date: new Date(timestamp).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: days === '1' ? undefined : 'short',
            hour: days === '1' ? '2-digit' : undefined,
            minute: days === '1' ? '2-digit' : undefined,
          }),
          price: Math.round(price * 100) / 100,
        })
      )
      setChartData(formatted)
      setChartLoading(false)
    } catch (err) {
      console.error('Failed to fetch chart:', err)
      setChartLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, 60000)
    return () => clearInterval(interval)
  }, [fetchCoins])

  useEffect(() => {
    fetchChartData(selectedCoin, selectedPeriod)
  }, [selectedCoin, selectedPeriod, fetchChartData])

  const filteredCoins = coins.filter(
    (coin) =>
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