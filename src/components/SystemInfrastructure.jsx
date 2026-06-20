import React from 'react';
import { Server } from 'lucide-react';

export default function SystemInfrastructure() {
  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
          <Server size={12} />
          Architecture
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">System Infrastructure</h2>
        <p className="text-xs text-slate-500 mt-1">Technical overview of the Velo Finance platform</p>
      </div>
      <div className="glass-card-inner p-5 space-y-4 text-sm text-slate-300 leading-relaxed">
        <h3 className="text-white font-bold">Client-Side Computation</h3>
        <p>Velo Finance utilizes a zero-latency client-side computation model. All financial calculations, projections, and risk assessments are performed directly in your browser using optimized JavaScript matrices. This ensures rapid feedback and enhances privacy, as your exact raw inputs do not need to be processed by a centralized server.</p>
        
        <h3 className="text-white font-bold">Technology Stack</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Frontend:</strong> React 18, Vite, and Tailwind CSS v4.</li>
          <li><strong>Design System:</strong> Custom Liquid Glass UI with dynamic backdrop filters.</li>
          <li><strong>Data Visualization:</strong> Recharts for responsive, SVG-based charting.</li>
          <li><strong>Telemetry & Feedback:</strong> Supabase (PostgreSQL) for anonymized usage logging and community feedback collection.</li>
        </ul>

        <h3 className="text-white font-bold">Data Synchronization</h3>
        <p>When users opt to save their simulation metrics, an anonymized payload is transmitted to our distributed database edge nodes. This data is used solely to refine our baseline assumptions and improve the default parameters of our calculators.</p>
      </div>
    </div>
  );
}
