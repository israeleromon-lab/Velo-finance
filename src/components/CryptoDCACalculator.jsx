import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { supabase } from '../lib/supabaseClient';
import { TrendingUp, Save, CheckCircle, AlertCircle } from 'lucide-react';
import FeedbackCard from './FeedbackCard';

const CALCULATOR_ID = '7bdf7580-2aee-4cbe-b435-021c33c36c61';

export default function CryptoDCACalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [years, setYears] = useState(3);
  const [expectedGrowth, setExpectedGrowth] = useState(35);
  const [chartData, setChartData] = useState([]);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const [email, setEmail] = useState('');

  const calculateData = useCallback(() => {
    const data = [];
    let totalInvested = 0;
    let currentBalance = 0;
    const monthlyRate = (expectedGrowth / 100) / 12;

    for (let month = 1; month <= years * 12; month++) {
      totalInvested += monthlyContribution;
      currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
      
      if (month % 3 === 0 || month === years * 12) {
        data.push({
          name: `Mo ${month}`,
          Invested: Math.round(totalInvested),
          Value: Math.round(currentBalance),
          Gain: Math.max(0, Math.round(currentBalance - totalInvested)),
        });
      }
    }
    setChartData(data);
  }, [monthlyContribution, years, expectedGrowth]);

  useEffect(() => {
    calculateData();
  }, [calculateData]);

  const handleLogTelemetry = async (e) => {
    if (e) e.preventDefault();
    setSaveStatus('saving');
    try {
      const inputs = { monthlyContribution, years, expectedGrowth };
      const outputs = { finalValue: chartData[chartData.length - 1]?.Value || 0 };
      
      // Always log anonymous telemetry
      await supabase.from('calculation_logs').insert({
        calculator_id: CALCULATOR_ID,
        inputs,
        outputs
      });

      // If user provided an email, queue it for delivery
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

  const finalValue = chartData[chartData.length - 1]?.Value || 0;
  const totalInvested = chartData[chartData.length - 1]?.Invested || 0;
  const totalGain = finalValue - totalInvested;
  const gainPercent = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(1) : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-xs space-y-1" style={{ backdropFilter: 'blur(16px)' }}>
          <p className="text-slate-300 font-bold">{label}</p>
          <p className="text-indigo-400">Value: <span className="text-white font-mono">${payload[0]?.value?.toLocaleString()}</span></p>
          <p className="text-slate-500">Invested: <span className="text-slate-300 font-mono">${payload[1]?.value?.toLocaleString()}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
            <TrendingUp size={12} />
            Crypto Asset Module
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-2">DCA Multi-Year Projection Engine</h2>
          <p className="text-xs text-slate-500 mt-1">Model dollar-cost averaging scenarios across volatile digital asset markets</p>
        </div>
      </div>

      {/* GLASS SLIDERS CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-card-inner p-5">
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-3">
            Monthly Allocation
          </label>
          <div className="text-lg font-black text-white font-mono mb-2">${monthlyContribution.toLocaleString()}</div>
          <input
            type="range" min="10" max="2500" step="10"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            id="slider-monthly-contribution"
          />
          <div className="flex justify-between text-[9px] text-slate-600 mt-1 font-mono">
            <span>$10</span><span>$2,500</span>
          </div>
        </div>
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-3">
            Time Horizon
          </label>
          <div className="text-lg font-black text-white font-mono mb-2">{years} {years === 1 ? 'Year' : 'Years'}</div>
          <input
            type="range" min="1" max="10" step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            id="slider-years"
          />
          <div className="flex justify-between text-[9px] text-slate-600 mt-1 font-mono">
            <span>1yr</span><span>10yr</span>
          </div>
        </div>
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-3">
            Projected CAGR
          </label>
          <div className={`text-lg font-black font-mono mb-2 ${expectedGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {expectedGrowth >= 0 ? '+' : ''}{expectedGrowth}%
          </div>
          <input
            type="range" min="-10" max="150" step="5"
            value={expectedGrowth}
            onChange={(e) => setExpectedGrowth(Number(e.target.value))}
            id="slider-cagr"
          />
          <div className="flex justify-between text-[9px] text-slate-600 mt-1 font-mono">
            <span>-10%</span><span>+150%</span>
          </div>
        </div>
      </div>

      {/* VISUAL CHART INTERFACE */}
      <div className="chart-container h-72 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#161b26" />
            <XAxis dataKey="name" stroke="#475569" fontSize={9} tickLine={false} />
            <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Value" stroke="#818cf8" strokeWidth={2.5} fill="url(#colorValue)" dot={false} name="Portfolio Value" />
            <Line type="monotone" dataKey="Invested" stroke="#334155" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Principal Baseline" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* METRICS SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card-inner p-4 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Invested</p>
          <h4 className="text-base font-black text-slate-200 mt-1 font-mono">${totalInvested.toLocaleString()}</h4>
        </div>
        <div className="glass-card-inner p-4 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Terminal Value</p>
          <h4 className="text-base font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text mt-1 font-mono">${finalValue.toLocaleString()}</h4>
        </div>
        <div className="glass-card-inner p-4 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Gain</p>
          <h4 className={`text-base font-black mt-1 font-mono ${totalGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString()}
          </h4>
        </div>
        <div className="glass-card-inner p-4 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">ROI</p>
          <h4 className={`text-base font-black mt-1 font-mono ${totalGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalGain >= 0 ? '+' : ''}{gainPercent}%
          </h4>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center glass-card-inner p-4 gap-4">
        <div className="w-full md:w-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Terminal Model Valuation</p>
          <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text mt-0.5">
            ${finalValue.toLocaleString()}
          </h3>
        </div>
        <form onSubmit={handleLogTelemetry} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address for copy..."
            className="w-full sm:w-56 bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            className={`btn-glass btn-accent w-full sm:w-auto flex items-center justify-center gap-2 ${
              saveStatus === 'saving' ? 'opacity-60 cursor-wait' : ''
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
        <h3 className="text-white font-bold text-sm tracking-tight">The Structural Value Metrics of Asset Rebalancing & DCA Systems</h3>
        <p>
          Dollar-cost averaging acts as a systematic filter against macro structural pricing turbulence. By anchoring capital injections to rigid intervals, portfolio administrators systematically isolate deployment from emotional execution faults.
        </p>
        <p>
          Through asymmetric allocation layers, users can project historical trends over compound interest matrices. Utilizing client-side calculations inside Velo Finance maintains zero-latency forecasting structures for digital assets.
        </p>
      </article>

      {/* FEEDBACK CARD */}
      <FeedbackCard calculatorId={CALCULATOR_ID} accentColor="indigo" />
    </div>
  );
}
