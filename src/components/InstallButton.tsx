import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Проверяем, установлено ли уже
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Слушаем событие beforeinstallprompt
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
  }

  if (isInstalled || !deferredPrompt) return null

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={handleInstall}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium transition-colors z-50"
      >
        <Download size={20} />
        Установить приложение
      </motion.button>
    </AnimatePresence>
  )
}