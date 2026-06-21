import React, { useState } from 'react';
import { TrendingUp, Calculator, PieChart, Menu, X } from 'lucide-react';
import CryptoDCACalculator from './components/CryptoDCACalculator';
import FreelancerTaxCalculator from './components/FreelancerTaxCalculator';
import PortfolioRiskVisualizer from './components/PortfolioRiskVisualizer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SystemInfrastructure from './components/SystemInfrastructure';
import HowToUse from './components/HowToUse';
import { BookOpen } from 'lucide-react';

const tabs = [
  { id: 'guide', label: 'How to Use', icon: BookOpen, color: 'emerald' },
  { id: 'crypto', label: 'Crypto DCA', icon: TrendingUp, color: 'indigo' },
  { id: 'freelance', label: 'Freelance Runway', icon: Calculator, color: 'purple' },
  { id: 'portfolio', label: 'Portfolio Risk', icon: PieChart, color: 'pink' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND LIQUID GLOW AMBIENCE */}
      <div className="glow-orb glow-orb-indigo" style={{ top: '-10%', left: '-10%', width: '50vw', height: '50vw' }} />
      <div className="glow-orb glow-orb-purple" style={{ top: '20%', right: '-10%', width: '45vw', height: '45vw', filter: 'blur(140px)' }} />
      <div className="glow-orb glow-orb-pink" style={{ bottom: '-10%', left: '20%', width: '40vw', height: '40vw' }} />



      <header className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Velo Finance Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Velo Finance
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5 hidden sm:block">
                Fluid Computational Models for Modern Asset Allocations
              </p>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden btn-glass p-2 shrink-0 ml-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        {/* LIQUID GLASS NAVIGATION */}
        <nav className={`${
          mobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row gap-1.5 glass-nav p-1.5 w-full md:w-auto`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wide rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'glass-tab-active'
                    : 'glass-tab-inactive'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* CALCULATOR CONTAINER MODULE */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in-up" key={activeTab}>
              {activeTab === 'guide' && <HowToUse />}
              {activeTab === 'crypto' && <CryptoDCACalculator />}
              {activeTab === 'freelance' && <FreelancerTaxCalculator />}
              {activeTab === 'portfolio' && <PortfolioRiskVisualizer />}
              {activeTab === 'privacy' && <PrivacyPolicy />}
              {activeTab === 'terms' && <TermsOfService />}
              {activeTab === 'infrastructure' && <SystemInfrastructure />}
            </div>
          </div>

          {/* SIDEBAR WIDGETS */}
          <div className="space-y-6">
            

            <div className="glass-card p-5" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Sovereign Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Calculations are modeled entirely client-side across highly polished local variables. Anonymized operational telemetry strings sync into distributed cloud edge instances for systemic optimization parameters.
              </p>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Why Velo Finance?</h3>
              <ul className="text-xs text-slate-400 leading-relaxed font-medium space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">●</span>
                  Zero-latency client-side forecasting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">●</span>
                  Multi-asset DCA & runway models
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">●</span>
                  Privacy-first anonymized analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>



      <footer className="relative z-10 border-t border-white/[0.05] bg-black/40 backdrop-blur-md mt-12 py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 Velo Finance. Built with client-side mathematical variables. No financial advisory implied.</p>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveTab('privacy'); window.scrollTo(0, 0); }} className="hover:text-slate-300 transition duration-200">Privacy Policy</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); setActiveTab('terms'); window.scrollTo(0, 0); }} className="hover:text-slate-300 transition duration-200">Terms of Service</a>
          <a href="#infrastructure" onClick={(e) => { e.preventDefault(); setActiveTab('infrastructure'); window.scrollTo(0, 0); }} className="hover:text-slate-300 transition duration-200">System Infrastructure</a>
        </div>
      </footer>
    </div>
  );
}
