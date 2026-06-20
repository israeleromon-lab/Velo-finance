# Velo Finance 🌊

> Fluid Computational Models for Modern Asset Allocations

Velo Finance is a premium, client-side financial calculator suite built with React and Vite. It features a highly polished "Liquid Glass" design system and provides zero-latency financial projections. 

![Velo Finance](https://via.placeholder.com/1200x600/080b11/818cf8?text=Velo+Finance+-+Premium+Calculator+Suite)

## ✨ Features

- **Liquid Glass UI:** A bespoke, stunning user interface built with Tailwind CSS v4, featuring dynamic backdrop filters, ambient glow orbs, and micro-animations.
- **Crypto DCA Engine:** Project multi-year dollar-cost averaging scenarios across volatile digital asset markets with interactive charts.
- **Freelance Runway Matrix:** Model annual freelance income, tax liabilities, and personal financial runway with a color-coded elasticity bar.
- **Portfolio Risk Visualizer:** Assess portfolio volatility and risk-variance through an interactive allocation pie chart and spectral risk vectors.
- **Zero-Latency Forecasting:** All mathematical projections are processed entirely client-side via optimized JavaScript state.
- **Anonymized Telemetry (Supabase):** Users can opt to sync their simulation metrics anonymously to a distributed Postgres backend for systemic optimization parameters.
- **Built for Monetization:** Strategically placed contextual ad blocks ready for Google AdSense integration.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS v4 (Custom `@theme` architecture)
- **Visualizations:** Recharts
- **Icons:** Lucide React
- **Backend/Database:** Supabase (PostgreSQL)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com/) account (free tier works great)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/velo-finance.git
cd velo-finance
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup
1. Open your Supabase Dashboard.
2. Navigate to the **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` and run it to set up the `calculators`, `calculation_logs`, and `tool_feedback` tables with necessary RLS policies.

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to see the app running locally.

## 📦 Building for Production

```bash
npm run build
```
Vite uses Rolldown for optimal chunking (`vendor.js`, `charts.js`, `index.js`). The generated `dist` folder can be seamlessly deployed to Cloudflare Pages, Vercel, or Netlify.

## 📄 License

This project is licensed under the MIT License.
