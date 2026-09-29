import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
}

// 🧠 "Мозг" ИИ-ассистента (база знаний)
const getAIResponse = (question: string): string => {
  const q = question.toLowerCase()
  
  if (q.includes('биткоин') || q.includes('bitcoin') || q.includes('btc')) {
    return 'Биткоин (BTC) — это первая и самая капитализированная криптовалюта. Его цена сильно зависит от халвинга, притока средств в спотовые ETF и общей ликвидности на рынке. Всегда следи за графиком выше!'
  }
  if (q.includes('эфириум') || q.includes('ethereum') || q.includes('eth')) {
    return 'Эфириум (ETH) — это фундамент для смарт-контрактов, DeFi и NFT. Его цена часто реагирует на обновления сети (например, снижение комиссий) и интерес институционалов.'
  }
  if (q.includes('солана') || q.includes('solana') || q.includes('sol')) {
    return 'Солана (SOL) известна своей невероятной скоростью и низкими комиссиями. Она очень популярна для мемкоинов и DeFi-проектов, но имеет высокую волатильность.'
  }
  if (q.includes('что купить') || q.includes('совет') || q.includes('прогноз') || q.includes('инвестир')) {
    return 'Я ИИ-ассистент, а не финансовый консультант! 📉 Главное правило крипты: проводите собственное исследование (DYOR). Обращайте внимание на капитализацию, объемы торгов и не инвестируйте больше, чем готовы потерять.'
  }
  if (q.includes('привет') || q.includes('здравствуй')) {
    return 'Привет! Я твой виртуальный помощник по рынку криптовалют. Спроси меня про Биткоин, Эфириум или дай совет по инвестициям!'
  }
  return 'Отличный вопрос! Я пока анализирую рынок, но рекомендую обратить внимание на график выше. Если хочешь узнать про конкретную монету — просто напиши её название, например: "Что такое Биткоин?"'
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Я твой ИИ-ассистент по крипте. Задай мне любой вопрос! 🚀', sender: 'ai' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Автоматический скролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true) // Показываем, что бот "печатает"

    // Имитация "раздумий" нейросети (1.5 секунды)
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: getAIResponse(input),
        sender: 'ai'
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Плавающая кнопка чата */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 z-50 hover:bg-blue-600 transition-colors"
        aria-label="Открыть чат с ИИ"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-[#1a2332] rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-700 overflow-hidden max-h-[500px]">
            {/* Заголовок */}
            <div className="bg-[#0a0e17] p-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Крипто-ИИ</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                    Онлайн
                  </p>
                </div>
              </div>
              <button 
                   onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                    }} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                                     >
                    <X size={20} />
                   </button>
            </div>

            {/* Область сообщений */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[350px]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-[#0a0e17] text-gray-200 rounded-bl-none border border-gray-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Анимация "печатает..." */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0a0e17] border border-gray-700 rounded-2xl p-3 flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="p-3 border-t border-gray-700 bg-[#0a0e17]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Спроси про Биткоин..."
                  className="flex-1 bg-[#1a2332] border border-gray-600 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}