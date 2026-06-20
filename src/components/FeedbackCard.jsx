import React, { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function FeedbackCard({ calculatorId, accentColor = 'indigo' }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await supabase.from('tool_feedback').insert({
        calculator_id: calculatorId,
        rating,
        comment: comment.trim() || null,
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Feedback submission failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const accentColors = {
    indigo: { star: '#818cf8', bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.15)' },
    purple: { star: '#a855f7', bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.15)' },
    pink: { star: '#ec4899', bg: 'rgba(236, 72, 153, 0.08)', border: 'rgba(236, 72, 153, 0.15)' },
  };

  const colors = accentColors[accentColor] || accentColors.indigo;

  if (submitted) {
    return (
      <div className="glass-card-inner p-5 text-center animate-fade-in-up">
        <CheckCircle size={28} className="mx-auto mb-2" style={{ color: colors.star }} />
        <p className="text-sm font-bold text-white">Thank you for your feedback!</p>
        <p className="text-xs text-slate-500 mt-1">Your input helps improve Velo Finance calculators.</p>
      </div>
    );
  }

  return (
    <div
      className="glass-card-inner p-5 space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Rate This Calculator</h4>
          <p className="text-[10px] text-slate-500 mt-0.5">Your feedback fuels our optimization engine</p>
        </div>
      </div>

      {/* STAR RATING */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="star-btn"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={22}
              fill={(hoveredStar || rating) >= star ? colors.star : 'transparent'}
              stroke={(hoveredStar || rating) >= star ? colors.star : '#475569'}
              strokeWidth={1.5}
              style={{ transition: 'all 0.15s ease' }}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="text-xs text-slate-500 ml-2 font-mono">{rating}/5</span>
        )}
      </div>

      {/* COMMENT */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0, 500))}
        placeholder="Share your thoughts (optional, max 500 chars)..."
        rows={2}
      />
      <div className="flex justify-between items-center">
        <span className="text-[9px] text-slate-600 font-mono">{comment.length}/500</span>
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || submitting}
          className={`btn-glass flex items-center gap-2 ${
            rating === 0 ? 'opacity-30 cursor-not-allowed' : ''
          } ${submitting ? 'opacity-60 cursor-wait' : ''}`}
        >
          <Send size={12} />
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
}
