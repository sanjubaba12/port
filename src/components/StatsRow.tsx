/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatModel } from '../types';

interface StatsRowProps {
  onStatClick: (stat: StatModel) => void;
}

const STATS: StatModel[] = [
  {
    value: '150+',
    indexCode: '(80)',
    label: 'Projects delivered',
    isRedTheme: false,
  },
  {
    value: '98%',
    indexCode: '(802)',
    label: 'Client satisfaction',
    isRedTheme: true,
  },
];

export function StatsRow({ onStatClick }: StatsRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap gap-4 mt-16 xl:mt-20 select-none">
      {STATS.map((stat, idx) => {
        const isHovered = hoveredIndex === idx;

        // Extracting background/styles exactly matching Sleek Interface Design HTML
        const cardBg = stat.isRedTheme ? 'rgba(61, 10, 10, 0.7)' : 'rgba(20, 20, 20, 0.7)';
        const cardBorder = stat.isRedTheme
          ? 'border-white/20 hover:border-white/40'
          : 'border-white/10 hover:border-white/25';

        const textLabelColor = stat.isRedTheme ? 'text-gray-300' : 'text-gray-400';
        const indexCodeColor = stat.isRedTheme ? 'text-gray-400 font-mono' : 'text-gray-500 font-mono';

        return (
          <motion.div
            key={stat.label}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onStatClick(stat)}
            style={{
              backgroundColor: cardBg,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            className={`w-full sm:w-60 p-6 rounded-3xl border relative h-36 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 ${cardBorder}`}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            id={`stat-card-${idx}`}
          >
            {/* Soft background light */}
            <span className="absolute top-4 right-4 text-xl opacity-30 select-none transition-transform duration-700">
              ✱
            </span>

            {/* Value & sub-index code */}
            <div className="flex items-baseline gap-2 relative z-10">
              <motion.h2
                className="text-5xl font-light tracking-tighter text-white font-sans"
              >
                {stat.value}
              </motion.h2>
              <span className={`text-[9px] font-mono ${indexCodeColor}`}>
                {stat.indexCode}
              </span>
            </div>

            {/* Label */}
            <div className="space-y-0.5 relative z-10">
              <p className={`text-xs ${textLabelColor} font-medium tracking-tight`}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
