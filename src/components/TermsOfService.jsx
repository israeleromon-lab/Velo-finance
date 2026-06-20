import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
          <FileText size={12} />
          Legal
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">Terms of Service</h2>
        <p className="text-xs text-slate-500 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="glass-card-inner p-5 space-y-4 text-sm text-slate-300 leading-relaxed">
        <h3 className="text-white font-bold">1. Acceptance of Terms</h3>
        <p>By accessing and using Velo Finance, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        
        <h3 className="text-white font-bold">2. Educational Purposes Only</h3>
        <p>The calculators and tools provided on Velo Finance are for educational and informational purposes only. They do not constitute financial, investment, or tax advice. You should consult with a qualified professional before making any financial decisions.</p>

        <h3 className="text-white font-bold">3. Disclaimer of Warranties</h3>
        <p>Our tools are provided "as is" without any warranties, expressed or implied. We do not guarantee the accuracy, completeness, or usefulness of any calculations or projections.</p>

        <h3 className="text-white font-bold">4. Limitation of Liability</h3>
        <p>In no event shall Velo Finance or its operators be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our tools.</p>
      </div>
    </div>
  );
}
