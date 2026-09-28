import { motion } from 'framer-motion'
import type { TimePeriod } from '../hooks/useCryptoData'

interface Props {
  selectedPeriod: TimePeriod
  onPeriodChange: (period: TimePeriod) => void
}

const periods: { value: TimePeriod; label: string }[] = [
  { value: '1', label: '24ч' },
  { value: '7', label: '7д' },
  { value: '30', label: '30д' },
  { value: '365', label: '1г' },
]

export default function PeriodSelector({ selectedPeriod, onPeriodChange }: Props) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {periods.map((period) => (
        <motion.button
          key={period.value}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPeriodChange(period.value)}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedPeriod === period.value
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-[#1a2332] text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  )
}