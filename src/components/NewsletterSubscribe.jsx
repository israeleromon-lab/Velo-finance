import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email.trim(),
      });

      if (error && error.code !== '23505') throw error; // 23505 is unique violation (already subscribed)
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      {/* Background ambient glow specific to this card */}
      <div className="absolute top-[-50%] right-[-50%] w-[150%] h-[150%] bg-gradient-to-bl from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2 mb-2">
          <Mail size={16} className="text-emerald-400" />
          Alpha Intel Updates
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-medium mb-4">
          Join 5,000+ investors receiving our highly optimized financial models, DCA strategies, and portfolio analytics right in their inbox.
        </p>

        <form onSubmit={handleSubscribe} className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-3 pr-10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !email}
            className={`absolute right-1.5 top-1.5 bottom-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded-md px-2.5 transition-colors flex items-center justify-center ${
              !email ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? (
              <span className="animate-spin text-emerald-400 text-xs">⟳</span>
            ) : status === 'success' ? (
              <CheckCircle size={14} />
            ) : status === 'error' ? (
              <AlertCircle size={14} className="text-rose-400" />
            ) : (
              <ArrowRight size={14} />
            )}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-[10px] text-emerald-400 mt-2 font-medium flex items-center gap-1 animate-fade-in-up">
            <CheckCircle size={10} /> Subscription activated.
          </p>
        )}
        {status === 'error' && (
          <p className="text-[10px] text-rose-400 mt-2 font-medium flex items-center gap-1 animate-fade-in-up">
            <AlertCircle size={10} /> Sync failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
