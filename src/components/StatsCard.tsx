import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  title: string
  value: string
  icon?: ReactNode
  delay?: number
}

export default function StatsCard({ title, value, icon, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1a2332] rounded-xl p-4 flex items-center justify-between"
    >
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-lg font-bold text-white mt-1">{value}</p>
      </div>
      {icon && (
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          {icon}
        </div>
      )}
    </motion.div>
  )
}