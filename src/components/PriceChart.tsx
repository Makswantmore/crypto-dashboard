import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import type { ChartDataPoint } from '../types/crypto'
import type { TimePeriod } from '../hooks/useCryptoData'

interface Props {
  data: ChartDataPoint[]
  coinName: string
  loading: boolean
  selectedPeriod: TimePeriod
  onPeriodChange: (period: TimePeriod) => void
}

const periods: { value: TimePeriod; label: string }[] = [
  { value: '1', label: '24ч' },
  { value: '7', label: '7д' },
  { value: '30', label: '30д' },
  { value: '365', label: '1г' },
]

export default function PriceChart({ data, coinName, loading, selectedPeriod, onPeriodChange }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        Загрузка графика...
      </div>
    )
  }

  const isPositive = data.length > 1 && data[data.length - 1].price >= data[0].price
  const color = isPositive ? '#22c55e' : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1a2332] rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          {coinName}
        </h2>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#0a0e17] text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#475569"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#475569"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={['auto', 'auto']}
          />
              <Tooltip
                 contentStyle={{
                 backgroundColor: '#1e293b',
                 border: '1px solid #334155',
                 borderRadius: '8px',
                 color: '#f1f5f9',
                                                  }}
                 formatter={(value: any, name: any) => {
                 if (typeof value === 'number') {
                return [`$${value.toLocaleString()}`, 'Цена']
                                                                }
                return [value, name]
                                    }}
/>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}