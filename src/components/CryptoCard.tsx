import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import type { CryptoData } from '../types/crypto'

interface Props {
  coin: CryptoData
  isSelected: boolean
  onClick: () => void
  index: number
}

export default function CryptoCard({ coin, isSelected, onClick, index }: Props) {
  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-blue-500/10 border border-blue-500/30'
          : 'bg-[#1a2332] border border-transparent hover:border-gray-700'
      }`}
    >
      
      {!imgError && coin.image ? (
        <img
          src={coin.image}
          alt={coin.name}
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full bg-white p-1 object-contain"
          onError={() => setImgError(true)} 
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm uppercase border border-blue-500/30">
          {coin.symbol.slice(0, 2)}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white truncate">{coin.name}</span>
          <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-lg font-bold text-white">
            ${coin.current_price.toLocaleString()}
          </span>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}