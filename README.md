<div align="center">

# 📊 Crypto Dashboard

**A real-time cryptocurrency tracking dashboard with interactive charts, smooth animations, and a modern dark UI.**

[Live Demo](https://your-vercel-link.vercel.app) · [Report Bug](https://github.com/YOUR_USERNAME/crypto-dashboard/issues) · [Request Feature](https://github.com/YOUR_USERNAME/crypto-dashboard/issues)

![Dashboard Preview](./public/demo.gif)

</div>

---

## ✨ Features

- 📈 **Interactive Charts** — Switch between 24h / 7d / 30d / 1y timeframes
- 🔄 **Live Data** — Auto-refreshes every 60 seconds via CoinGecko API
- 🔍 **Instant Search** — Filter coins by name or ticker
- 💰 **Market Overview** — Total market cap, 24h volume, coin count
- 🎨 **Dark Theme** — Sleek financial-grade UI inspired by Bloomberg & TradingView
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ⚡ **Smooth Animations** — Powered by Framer Motion
- 🛡️ **Graceful Fallbacks** — Custom placeholders when coin images fail to load

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | React 18 + TypeScript               |
| Build Tool | Vite                                |
| Styling    | Tailwind CSS                        |
| Charts     | Recharts                            |
| Animations | Framer Motion                       |
| Icons      | Lucide React                        |
| Data       | CoinGecko API (free tier)           |

## 📱 PWA Support

This app is a **Progressive Web App** and can be installed on mobile devices:
- Works offline
- Installable from browser
- Native-like experience
- No app store required

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev