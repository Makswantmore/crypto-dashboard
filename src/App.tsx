import { Search, BarChart3, DollarSign, Activity } from 'lucide-react'
import { useCryptoData } from './hooks/useCryptoData'
import CryptoCard from './components/CryptoCard'
import PriceChart from './components/PriceChart'
import StatsCard from './components/StatsCard'

export default function App() {
  const {
    coins,
    chartData,
    selectedCoin,
    setSelectedCoin,
    selectedPeriod,
    setSelectedPeriod,
    loading,
    chartLoading,
    searchQuery,
    setSearchQuery,
  } = useCryptoData()

  const selectedCoinData = coins.find((c) => c.id === selectedCoin)

  const totalMarketCap = coins.reduce((sum, c) => sum + c.market_cap, 0)
  const totalVolume = coins.reduce((sum, c) => sum + c.total_volume, 0)

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="text-blue-400" size={32} />
            Crypto Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Отслеживайте криптовалюты в реальном времени
          </p>
        </div>
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
            className="bg-[#1a2332] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-full md:w-72 transition-colors"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Всего монет"
          value={coins.length.toString()}
          icon={<Activity size={24} />}
          delay={0}
        />
        <StatsCard
          title="Общая капитализация"
          value={`$${(totalMarketCap / 1e12).toFixed(2)}T`}
          icon={<DollarSign size={24} />}
          delay={0.1}
        />
        <StatsCard
          title="Объём за 24ч"
          value={`$${(totalVolume / 1e9).toFixed(2)}B`}
          icon={<BarChart3 size={24} />}
          delay={0.2}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coin List */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Загрузка...</p>
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

        {/* Chart */}
        <div className="lg:col-span-2">
          <PriceChart
            data={chartData}
            coinName={selectedCoinData?.name ?? 'Bitcoin'}
            loading={chartLoading}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>
      </div>
    </div>
  )
}