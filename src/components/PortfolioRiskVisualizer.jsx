import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon, Shield, Zap, TrendingUp, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import FeedbackCard from './FeedbackCard';
import AdBanner from './AdBanner';

const CALCULATOR_ID = 'b2c3d4e5-6f78-90ab-cdef-123456789012';

export default function PortfolioRiskVisualizer() {
  const [stocks, setStocks] = useState(60);
  const [crypto, setCrypto] = useState(20);
  const [bonds, setBonds] = useState(20);
  const [saveStatus, setSaveStatus] = useState(null);
  const [email, setEmail] = useState('');

  const total = stocks + crypto + bonds;

  const handleLogTelemetry = async (e) => {
    if (e) e.preventDefault();
    setSaveStatus('saving');
    try {
      const inputs = { stocks, crypto, bonds };
      const outputs = { total, riskScore: ((stocks * 0.6) + (crypto * 1.5) + (bonds * 0.1)).toFixed(2) };
      
      await supabase.from('calculation_logs').insert({
        calculator_id: CALCULATOR_ID,
        inputs,
        outputs
      });

      if (email && email.includes('@')) {
        const { error } = await supabase.from('emailed_results').insert({
          email: email.trim(),
          calculator_id: CALCULATOR_ID,
          inputs,
          outputs
        });
        if (error) throw error;
      }

      setSaveStatus('saved');
      setEmail('');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const data = [
    { name: 'Equities / Stocks', value: stocks, color: '#818cf8', icon: TrendingUp },
    { name: 'Digital Assets / Crypto', value: crypto, color: '#a855f7', icon: Zap },
    { name: 'Fixed Income / Bonds', value: bonds, color: '#475569', icon: Shield },
  ];

  const calculateRiskScore = () => {
    const score = (stocks * 0.6) + (crypto * 1.5) + (bonds * 0.1);
    if (score > 90) return {
      label: 'SPECTRAL ALPHA VECTORS',
      sublabel: 'Aggressive',
      css: 'text-red-400 bg-red-500/5 border-red-500/10',
      barColor: 'linear-gradient(90deg, #ef4444, #f97316)',
      barWidth: 95,
    };
    if (score > 50) return {
      label: 'BALANCED MODAL STRUCTURAL',
      sublabel: 'Medium Risk',
      css: 'text-amber-400 bg-amber-500/5 border-amber-500/10',
      barColor: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
      barWidth: 60,
    };
    return {
      label: 'CONSERVATIVE LIQUID CAP',
      sublabel: 'Low Risk',
      css: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10',
      barColor: 'linear-gradient(90deg, #34d399, #10b981)',
      barWidth: 25,
    };
  };

  const risk = calculateRiskScore();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-xs space-y-1" style={{ backdropFilter: 'blur(16px)' }}>
          <p className="text-white font-bold">{payload[0].name}</p>
          <p className="text-slate-400">Weight: <span className="text-white font-mono">{payload[0].value}%</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-md">
          <PieChartIcon size={12} />
          Capital Allocation
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">Portfolio Volatility & Risk-Variance Engine</h2>
        <p className="text-xs text-slate-500 mt-1">Visualize asset allocation weights and assess portfolio risk classification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center glass-card-inner p-5">
        <div className="space-y-5">
          {/* ALLOCATION TOTAL INDICATOR */}
          {total !== 100 && (
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-amber-400 text-xs font-medium flex items-center gap-2">
              <span className="text-amber-500 font-black text-sm">!</span>
              Allocations total {total}% — adjust to reach 100%
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 mr-1.5" />
              Equities Share: <span className="text-white font-mono">{stocks}%</span>
            </label>
            <input type="range" min="0" max="100" value={stocks}
              onChange={(e) => setStocks(Number(e.target.value))}
              id="slider-stocks"
              style={{ accentColor: '#818cf8' }}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-1.5" />
              Digital Assets: <span className="text-white font-mono">{crypto}%</span>
            </label>
            <input type="range" min="0" max="100" value={crypto}
              onChange={(e) => setCrypto(Number(e.target.value))}
              id="slider-crypto"
              style={{ accentColor: '#a855f7' }}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1.5" />
              Bonds Matrix: <span className="text-white font-mono">{bonds}%</span>
            </label>
            <input type="range" min="0" max="100" value={bonds}
              onChange={(e) => setBonds(Number(e.target.value))}
              id="slider-bonds"
              style={{ accentColor: '#64748b' }}
            />
          </div>
          
          {/* RISK CLASSIFICATION */}
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${risk.css}`}>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Portfolio Vector Classification</span>
            <span className="text-xs font-black tracking-wider block mt-1">{risk.label}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{risk.sublabel}</span>
            {/* Risk bar */}
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mt-3 border border-white/[0.04]">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${risk.barWidth}%`, background: risk.barColor }} />
            </div>
          </div>
        </div>

        {/* PIE CHART AREA */}
        <div className="h-60 flex justify-center items-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={78}
                paddingAngle={4}
                dataKey="value"
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* CENTER LABEL */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total</span>
            <span className={`text-xl font-black font-mono ${total === 100 ? 'text-white' : 'text-amber-400'}`}>{total}%</span>
          </div>
        </div>
      </div>

      {/* ALLOCATION BREAKDOWN TABLE */}
      <div className="glass-card-inner p-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          {data.map((asset, i) => (
            <div key={i} className="space-y-1">
              <div className="w-3 h-3 rounded-full mx-auto" style={{ backgroundColor: asset.color }} />
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{asset.name.split(' / ')[0]}</p>
              <p className="text-sm font-black text-white font-mono">{asset.value}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center glass-card-inner p-4 gap-4 mt-6">
        <div className="w-full md:w-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Terminal Model Valuation</p>
          <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text mt-0.5">
            {risk.label}
          </h3>
        </div>
        <form onSubmit={handleLogTelemetry} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address for copy..."
            className="w-full sm:w-56 bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={saveStatus === 'saving' || total !== 100}
            className={`btn-glass w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 ${
              saveStatus === 'saving' || total !== 100 ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {saveStatus === 'saving' && <span className="animate-spin text-xs">⟳</span>}
            {saveStatus === 'saved' && <CheckCircle size={14} />}
            {saveStatus === 'error' && <AlertCircle size={14} />}
            {!saveStatus && <Save size={14} />}
            {saveStatus === 'saved' ? 'Saved & Queued' : saveStatus === 'error' ? 'Sync Failed' : 'Save & Email Results'}
          </button>
        </form>
      </div>

      {/* SEO CONTENT */}
      <article className="border-t border-white/[0.05] pt-6 max-w-none text-slate-400 text-xs sm:text-sm leading-relaxed space-y-3 font-medium">
        <h3 className="text-white font-bold text-sm tracking-tight">Modern Portfolio Risk Optimizations Across Diverse Vector Networks</h3>
        <p>
          Managing risk variance vectors calls for continuous oversight of asset dependencies. Allocating capital weightings to high-velocity digital crypto networks accelerates capital growth coefficients but risks higher baseline drops, requiring balance from fixed-income components.
        </p>
      </article>

      {/* ADSTERRA NATIVE BANNER BLOCK */}
      <AdBanner />

      {/* FEEDBACK CARD */}
      <FeedbackCard calculatorId={CALCULATOR_ID} accentColor="pink" />
    </div>
  );
}
