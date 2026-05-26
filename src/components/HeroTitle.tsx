/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function HeroTitle() {
  return (
    <div className="text-left select-none relative max-w-5xl">
      {/* Decorative subtitle / indicator above */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-start gap-3 mb-6"
      >
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <p className="text-[9px] leading-tight text-gray-300 uppercase tracking-widest mt-1">
          Hub support peoples from<br />all over the world
        </p>
      </motion.div>

      {/* Main Big Headline */}
      <h1 className="text-[52px] sm:text-[72px] lg:text-[88px] xl:text-[96px] leading-[0.88] font-medium tracking-tighter text-white font-sans mb-10">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="block"
        >
          Technology
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="block"
        >
          Crafted for All
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="block"
        >
          Not{' '}
          <span className="font-serif italic font-light opacity-60">
            Machines
          </span>
        </motion.span>
      </h1>
    </div>
  );
}
