/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactData } from '../types';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    projectDescription: '',
  });
  const [interest, setInterest] = useState<string>('Custom UI/UX');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectDescription: '',
    });
    setInterest('Custom UI/UX');
    setSubmitted(false);
  };

  const handleBack = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-neutral-950/90 border border-white/10 p-8 text-white shadow-2xl z-10 backdrop-blur-xl"
            id="modal-get-started"
          >
            {/* Corner Decorative stars */}
            <div className="absolute top-0 right-0 p-8 opacity-25 pointer-events-none">
              <Star className="w-6 h-6 text-[#FF4D00] animate-pulse" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#FF4D00] rotate-45 rounded-sm flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase text-neutral-300">Start Your Chativ Project</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                id="btn-close-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="text-left">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Let's craft your vision.</h3>
                    <p className="text-sm text-neutral-400">
                      We pair modern performance engineering with bespoke aesthetic designs built completely for human experiences.
                    </p>
                  </div>

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1.5 font-mono">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition"
                        placeholder="e.g. Liam Vance"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1.5 font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1.5 font-mono">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>

                  {/* Interest Chips */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2 font-mono">
                      What are we building?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Custom UI/UX', 'Full-stack Platform', 'Cinematic Web3', 'Human Brand Design'].map((chip) => {
                        const isSelected = interest === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setInterest(chip)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition border ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#FF4D00] to-[#B32400] text-white border-[#FF4D00]'
                                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1.5 font-mono">
                      Brief project overview
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-[#FF4D00] transition"
                      placeholder="Describe what makes your vision special..."
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-[#FF4D00] to-[#B32400] text-white py-3.5 px-6 rounded-2xl font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
                      id="btn-submit-contact"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Preparing Workspace...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Launch Project Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold tracking-tight">Transmission Received</h4>
                    <p className="text-sm text-neutral-400 max-w-md mx-auto">
                      Thank you <span className="text-white font-medium">{formData.name}</span>! Our team at <span className="text-[#FF4D00]">Chativ</span> will analyze your idea for <span className="text-white italic">"{interest}"</span> and connect in under 12 hours.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
                    <span>Reference ID: CH-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition text-xs font-semibold cursor-pointer"
                    >
                      Draft Another Brief
                    </button>
                    <button
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition cursor-pointer"
                    >
                      Return to Showcase
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
