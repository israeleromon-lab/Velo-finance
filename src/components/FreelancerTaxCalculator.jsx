import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, Wallet, Clock, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import FeedbackCard from './FeedbackCard';

const CALCULATOR_ID = 'a1b2c3d4-5e6f-7890-abcd-ef1234567890';

export default function FreelancerTaxCalculator() {
  const [grossRevenue, setGrossRevenue] = useState(85000);
  const [expenses, setExpenses] = useState(12000);
  const [taxRate, setTaxRate] = useState(25);
  const [monthlyBurn, setMonthlyBurn] = useState(3000);
  const [saveStatus, setSaveStatus] = useState(null);
  const [email, setEmail] = useState('');

  const handleLogTelemetry = async (e) => {
    if (e) e.preventDefault();
    setSaveStatus('saving');
    try {
      const inputs = { grossRevenue, expenses, taxRate, monthlyBurn };
      const outputs = { netIncome, totalTax, takeHomePay, runwayMonths };
      
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

  const netIncome = grossRevenue - expenses;
  const totalTax = netIncome * (taxRate / 100);
  const takeHomePay = netIncome - totalTax;
  const runwayMonths = monthlyBurn > 0 ? (takeHomePay / monthlyBurn).toFixed(1) : '∞';
  const monthlyTakeHome = (takeHomePay / 12).toFixed(0);
  const effectiveRate = grossRevenue > 0 ? ((totalTax / grossRevenue) * 100).toFixed(1) : 0;

  const runwayColor = () => {
    const months = parseFloat(runwayMonths);
    if (isNaN(months)) return 'text-emerald-400';
    if (months >= 12) return 'text-emerald-400';
    if (months >= 6) return 'text-amber-400';
    return 'text-rose-400';
  };

  const runwayBarWidth = () => {
    const months = parseFloat(runwayMonths);
    if (isNaN(months)) return 100;
    return Math.min(100, (months / 24) * 100);
  };

  const metrics = [
    { label: 'Net Operational', value: `$${netIncome.toLocaleString()}`, icon: DollarSign, color: 'text-slate-200' },
    { label: 'Tax Allocation', value: `$${totalTax.toLocaleString()}`, icon: TrendingDown, color: 'text-rose-400', sub: `${effectiveRate}% effective` },
    { label: 'Liquid Reserves', value: `$${takeHomePay.toLocaleString()}`, icon: Wallet, color: 'text-emerald-400', sub: `$${Number(monthlyTakeHome).toLocaleString()}/mo` },
    { label: 'Active Runway', value: `${runwayMonths} Mo`, icon: Clock, color: runwayColor() },
  ];

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
          <Calculator size={12} />
          Freelance Operations
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">Income Analytics & Sovereign Runway Matrix</h2>
        <p className="text-xs text-slate-500 mt-1">Model your annual freelance income, tax liability, and personal financial runway</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 glass-card-inner p-5">
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
            Annual Gross Contract Value ($)
          </label>
          <input
            type="number" value={grossRevenue}
            onChange={(e) => setGrossRevenue(Number(e.target.value))}
            id="input-gross-revenue"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
            Operating System Expenses ($)
          </label>
          <input
            type="number" value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            id="input-expenses"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
            Effective Tax Liability Provision (%)
          </label>
          <input
            type="number" value={taxRate} min={0} max={100}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            id="input-tax-rate"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
            Personal Monthly Capital Burn ($)
          </label>
          <input
            type="number" value={monthlyBurn}
            onChange={(e) => setMonthlyBurn(Number(e.target.value))}
            id="input-monthly-burn"
          />
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="glass-card-inner p-4 group hover:bg-white/[0.03] transition-colors duration-200">
              <div className="flex items-center gap-1.5 mb-2">
                <Icon size={12} className="text-slate-500" />
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{m.label}</p>
              </div>
              <h4 className={`text-base font-black mt-1 font-mono ${m.color}`}>{m.value}</h4>
              {m.sub && <p className="text-[9px] text-slate-600 font-mono mt-0.5">{m.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* RUNWAY PROGRESS BAR */}
      <div className="glass-card-inner p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Runway Visualization</span>
          <span className={`text-xs font-black font-mono ${runwayColor()}`}>{runwayMonths} months</span>
        </div>
        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/[0.04]">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${runwayBarWidth()}%`,
              background: parseFloat(runwayMonths) >= 12
                ? 'linear-gradient(90deg, #34d399, #2dd4bf)'
                : parseFloat(runwayMonths) >= 6
                ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                : 'linear-gradient(90deg, #fb7185, #ef4444)',
              boxShadow: '0 0 12px rgba(52, 211, 153, 0.3)',
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-600 mt-1 font-mono">
          <span>0 mo</span><span>6 mo</span><span>12 mo</span><span>24 mo</span>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center glass-card-inner p-4 gap-4 mt-6">
        <div className="w-full md:w-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Terminal Model Valuation</p>
          <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text mt-0.5">
            {runwayMonths} Months
          </h3>
        </div>
        <form onSubmit={handleLogTelemetry} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address for copy..."
            className="w-full sm:w-56 bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            className={`btn-glass w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 ${
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
        <h3 className="text-white font-bold text-sm tracking-tight">Sovereign Financial Runway Strategy for Independent Software Operators</h3>
        <p>
          Liquid reserve runtimes quantify the baseline structural elasticity of a service business model. Establishing real-time tax accounting buffers directly mitigates cash flow vulnerabilities against localized enterprise client volatility.
        </p>
      </article>

      {/* FEEDBACK CARD */}
      <FeedbackCard calculatorId={CALCULATOR_ID} accentColor="purple" />
    </div>
  );
}
