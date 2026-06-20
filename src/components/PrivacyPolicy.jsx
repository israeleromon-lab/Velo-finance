import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
          <Shield size={12} />
          Legal
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">Privacy Policy</h2>
        <p className="text-xs text-slate-500 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="glass-card-inner p-5 space-y-4 text-sm text-slate-300 leading-relaxed">
        <h3 className="text-white font-bold">1. Information We Collect</h3>
        <p>Velo Finance operates primarily as a client-side calculator suite. We do not require account creation, and we do not collect personally identifiable financial data by default. However, if you choose to subscribe to our newsletter or request a copy of your calculation results via email, we will securely collect and store your email address. We also collect anonymized telemetry regarding the usage of our calculators (such as generic input ranges and calculation outcomes) to improve our models.</p>
        
        <h3 className="text-white font-bold">2. How We Use Information</h3>
        <p>Email addresses collected through our newsletter form or "Email My Results" feature are used exclusively to deliver the requested content and strategic updates. We do not sell your email address to third parties. Any anonymized telemetry collected is used solely for statistical analysis, system performance monitoring, and improving the accuracy of our computational models.</p>

        <h3 className="text-white font-bold">3. Third-Party Services</h3>
        <p>We use third-party services such as Google AdSense for advertising. These third parties may use cookies, web beacons, and similar technologies to collect or receive information from our website to provide measurement services and target ads.</p>

        <h3 className="text-white font-bold">4. Data Security</h3>
        <p>We implement standard security measures to protect against unauthorized access to our systems. Because financial calculations are performed locally in your browser, sensitive inputs remain on your device unless explicitly saved to our anonymized database.</p>
      </div>
    </div>
  );
}
