/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';

interface TirtaMascotProps {
  dialogue?: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'thinking' | 'excited' | 'explaining';
  showDialogue?: boolean;
}

export const TirtaMascot: React.FC<TirtaMascotProps> = ({
  dialogue,
  size = 'md',
  mood = 'happy',
  showDialogue = true,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex items-start gap-3.5 my-2">
      <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
        {/* Animated glowing backdrop */}
        <div className="absolute inset-0 rounded-full bg-sky-200/60 blur-sm animate-pulse" />
        
        {/* Tirta Water Drop Character SVG */}
        <svg
          viewBox="0 0 100 115"
          className="relative w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tirtaBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="tirtaHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Water drop body shape */}
          <path
            d="M50 4 C50 4 16 52 16 75 C16 94 31 108 50 108 C69 108 84 94 84 75 C84 52 50 4 50 4 Z"
            fill="url(#tirtaBodyGrad)"
            stroke="#0284c7"
            strokeWidth="2.5"
          />

          {/* Glossy top-left highlight */}
          <path
            d="M50 14 C48 18 28 54 26 73 C25 80 28 90 34 94 C30 88 28 78 30 70 C34 54 48 24 50 14 Z"
            fill="url(#tirtaHighlight)"
          />

          {/* Cheerful Eyes */}
          {mood === 'thinking' ? (
            <g>
              <ellipse cx="40" cy="67" rx="3.5" ry="5" fill="#0c4a6e" />
              <circle cx="41.5" cy="65.5" r="1.5" fill="#ffffff" />
              <path d="M57 66 Q62 64 67 67" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              {/* Left Eye */}
              <ellipse cx="38" cy="68" rx="4.5" ry="6" fill="#082f49" />
              <circle cx="40" cy="66" r="2" fill="#ffffff" />
              {/* Right Eye */}
              <ellipse cx="62" cy="68" rx="4.5" ry="6" fill="#082f49" />
              <circle cx="64" cy="66" r="2" fill="#ffffff" />
            </g>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="30" cy="76" rx="4.5" ry="2.5" fill="#f472b6" opacity="0.65" />
          <ellipse cx="70" cy="76" rx="4.5" ry="2.5" fill="#f472b6" opacity="0.65" />

          {/* Smile / Mouth */}
          {mood === 'excited' ? (
            <path
              d="M42 77 Q50 89 58 77 Z"
              fill="#ef4444"
              stroke="#082f49"
              strokeWidth="1.5"
            />
          ) : mood === 'thinking' ? (
            <ellipse cx="50" cy="78" rx="3" ry="3" fill="#0c4a6e" />
          ) : (
            <path
              d="M43 76 Q50 84 57 76"
              stroke="#082f49"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Sparkle badge */}
          <circle cx="70" cy="42" r="3" fill="#fef08a" />
        </svg>

        {/* Small label */}
        <div className="text-center font-bold text-[10px] text-sky-700 tracking-wide uppercase">
          Tirta
        </div>
      </div>

      {showDialogue && dialogue && (
        <div className="flex-1 bg-white border border-sky-200 rounded-2xl rounded-tl-sm p-3.5 shadow-sm relative">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pesan dari Tirta</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{dialogue}</p>
        </div>
      )}
    </div>
  );
};
