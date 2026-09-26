import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  title: string
  value: string
  icon: ReactNode
  delay?: number
}

export default function StatsCard({ title, value, icon, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1a2332] rounded-2xl p-5 flex items-center gap-4"
    >
      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  )
}