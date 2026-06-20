import React from 'react';
import { BookOpen, TrendingUp, Calculator, PieChart, Save } from 'lucide-react';

export default function HowToUse() {
  return (
    <div className="glass-card p-6 space-y-8 animate-fade-in-up">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
          <BookOpen size={12} />
          User Guide
        </span>
        <h2 className="text-2xl font-black tracking-tight text-white mt-3">How to Use Velo Finance</h2>
        <p className="text-sm text-slate-400 mt-2 font-medium">A quick guide to maximizing our computational models.</p>
      </div>

      <div className="space-y-6">
        {/* Module 1 */}
        <div className="glass-card-inner p-6 flex flex-col md:flex-row gap-6 items-start hover:border-indigo-500/30 transition-colors duration-300">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 shrink-0">
            <TrendingUp size={24} />
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-bold tracking-wide text-lg">1. Crypto DCA Engine</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Use this to project the future value of consistent investments over time. 
              Adjust the <strong className="text-slate-200">Monthly Allocation</strong> to match your budget, set your <strong className="text-slate-200">Time Horizon</strong>, 
              and estimate a <strong className="text-slate-200">Projected CAGR</strong> (Compound Annual Growth Rate). The interactive area chart will 
              instantly visualize your principal baseline versus your total portfolio value.
            </p>
          </div>
        </div>

        {/* Module 2 */}
        <div className="glass-card-inner p-6 flex flex-col md:flex-row gap-6 items-start hover:border-purple-500/30 transition-colors duration-300">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 shrink-0">
            <Calculator size={24} />
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-bold tracking-wide text-lg">2. Freelance Runway Matrix</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designed for independent contractors to assess financial stability. Enter your <strong className="text-slate-200">Gross Revenue</strong> and 
              <strong className="text-slate-200"> Expenses</strong> to calculate net income. Set your expected <strong className="text-slate-200">Tax Rate</strong> to see true take-home pay, 
              and input your <strong className="text-slate-200">Monthly Burn</strong> (living expenses) to calculate your precise runway in months. 
              The color-coded progress bar indicates your stability level.
            </p>
          </div>
        </div>

        {/* Module 3 */}
        <div className="glass-card-inner p-6 flex flex-col md:flex-row gap-6 items-start hover:border-pink-500/30 transition-colors duration-300">
          <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 shrink-0">
            <PieChart size={24} />
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-bold tracking-wide text-lg">3. Portfolio Risk Visualizer</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Balance your capital across three major asset classes. Use the sliders to assign percentage weights to 
              <strong className="text-slate-200"> Equities</strong>, <strong className="text-slate-200">Crypto</strong>, and <strong className="text-slate-200">Bonds</strong>. Ensure the total reaches exactly 100%. 
              The engine will automatically classify your portfolio's risk vector from "Conservative" to "Aggressive".
            </p>
          </div>
        </div>

        {/* Saving Data */}
        <div className="glass-card-inner p-6 flex flex-col md:flex-row gap-6 items-start hover:border-teal-500/30 transition-colors duration-300">
          <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400 shrink-0">
            <Save size={24} />
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-bold tracking-wide text-lg">Saving & Feedback</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Found a scenario you like? Click <strong className="text-slate-200">Save Simulation Metrics</strong> at the bottom of the calculators. 
              This syncs anonymized telemetry to our database. You can also leave a 1-5 star rating and comments on the 
              feedback card at the bottom of each page to help us improve the models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
