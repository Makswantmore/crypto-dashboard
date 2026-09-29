import { Search, BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { useCryptoData } from './hooks/useCryptoData'
import CryptoCard from './components/CryptoCard'
import PriceChart from './components/PriceChart'
import StatsCard from './components/StatsCard'
import InstallButton from './components/InstallButton'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const {
    coins,
    chartData,
    selectedCoin,
    setSelectedCoin,
    selectedPeriod,
    setSelectedPeriod,
    chartLoading,
    searchQuery,
    setSearchQuery,
  } = useCryptoData()

  const selectedCoinData = coins.find((c) => c.id === selectedCoin)
  const isPositive = (selectedCoinData?.price_change_percentage_24h ?? 0) >= 0

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto pb-20">
      {/* Header с поиском */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Поиск монеты..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a2332] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Левая колонка: Заголовок + График */}
        <div className="lg:col-span-2 order-1">
          {/* Заголовок монеты */}
          {selectedCoinData ? (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={selectedCoinData.image}
                  alt={selectedCoinData.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full bg-white p-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {selectedCoinData.name}
                  </h1>
                  <span className="text-sm text-gray-500 uppercase">
                    {selectedCoinData.symbol}
                  </span>
                </div>
              </div>
              
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-white">
                  ${selectedCoinData.current_price.toLocaleString()}
                </span>
                <span
                  className={`flex items-center gap-1 text-lg font-semibold ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  {isPositive ? '+' : ''}
                  {selectedCoinData.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-6 h-24 bg-[#1a2332] rounded-xl animate-pulse" />
          )}

          {/* График */}
          <PriceChart
            data={chartData}
            loading={chartLoading}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>

        {/* Правая колонка: Статистика + Список монет */}
        <div className="lg:col-span-1 order-2 space-y-6">
          
          {/* Статистика */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Статистика
            </h3>
            <StatsCard
              title="Капитализация"
              value={selectedCoinData ? `$${(selectedCoinData.market_cap / 1e9).toFixed(2)}B` : '—'}
              icon={<BarChart3 size={20} />}
            />
            <StatsCard
              title="Объём за 24ч"
              value={selectedCoinData ? `$${(selectedCoinData.total_volume / 1e9).toFixed(2)}B` : '—'}
              icon={<BarChart3 size={20} />}
            />
          </div>

          {/* Список всех монет */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Все монеты
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {coins.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Загрузка монет...</p>
              ) : (
                coins.map((coin, index) => (
                  <CryptoCard
                    key={coin.id}
                    coin={coin}
                    isSelected={selectedCoin === coin.id}
                    onClick={() => setSelectedCoin(coin.id)}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <InstallButton />
      <ChatWidget />
    </div>
  )
}