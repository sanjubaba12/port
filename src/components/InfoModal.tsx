/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, CornerDownRight, ShieldCheck, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export function InfoModal({ isOpen, title, description, onClose }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 p-6 text-white shadow-2xl z-10 backdrop-blur-xl"
            id="modal-info"
          >
            {/* Title */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#FF4D00]" />
                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition cursor-pointer"
                id="btn-close-info"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-left">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {description}
              </p>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-orange-950/10 border border-orange-500/10 text-xs text-neutral-400">
                <CornerDownRight className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                <span>
                  Our user interface delivers 120 FPS render fidelity using React 18 & native graphic card transitions. No artificial delays.
                </span>
              </div>
            </div>

            {/* Back button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
