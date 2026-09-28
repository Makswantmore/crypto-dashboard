import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import type { ChartDataPoint } from '../types/crypto'
import type { TimePeriod } from '../hooks/useCryptoData'

interface Props {
  data: ChartDataPoint[]
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

export default function PriceChart({ data, loading, selectedPeriod, onPeriodChange }: Props) {
  if (loading || !data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500 bg-[#1a2332] rounded-2xl">
        {loading ? 'Загрузка графика...' : 'Нет данных'}
      </div>
    )
  }

  const isPositive = data[data.length - 1].price >= data[0].price
  const color = isPositive ? '#22c55e' : '#ef4444'

  return (
    <div className="bg-[#1a2332] rounded-2xl p-4 sm:p-6">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          <XAxis
            dataKey="date"
            stroke="#475569"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#475569"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: any) => `$${Number(value).toLocaleString()}`}
            domain={['auto', 'auto']}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
              padding: '10px 14px',
            }}
            labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Цена']}
            cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' }}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorPrice)"
            activeDot={{
              r: 6,
              fill: color,
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex gap-2 justify-center mt-4 flex-wrap">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selectedPeriod === period.value
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-[#0a0e17] text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  )
}