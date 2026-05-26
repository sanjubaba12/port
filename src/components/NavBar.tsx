/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe2, Layers, Cpu, Compass, BookOpen, Clock, Activity } from 'lucide-react';
import { NavItem } from '../types';

interface NavBarProps {
  onGetStartedClick: () => void;
  onShowInfoModal: (title: string, desc: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features', hasDropdown: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Product', href: '#product' },
  { label: 'Blogs', href: '#blogs' },
];

export function NavBar({ onGetStartedClick, onShowInfoModal }: NavBarProps) {
  const [usaTime, setUsaTime] = useState<string>('02:16 PM (USA)');
  const [isFeaturesOpen, setIsFeaturesOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic ticking USA East Coast Time (which is typically UTC-4 in DST May)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      try {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        // Replace punctuation or adjust format slightly to match standard "02:16:34 PM (USA)"
        const formatted = formatter.format(new Date());
        setUsaTime(`${formatted} (USA)`);
      } catch (e) {
        setUsaTime('02:16 PM (USA)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.hasDropdown) {
      setIsFeaturesOpen(!isFeaturesOpen);
    } else {
      setIsFeaturesOpen(false);
      onShowInfoModal(
        item.label,
        `Exploring the "${item.label}" section of Chativ. This screen models high-performance aesthetic user interfaces that load instantaneously without compromising cinematic fidelity.`
      );
    }
  };

  return (
    <header className="relative w-full flex items-center justify-between px-6 sm:px-12 py-6 z-40 select-none">
      
      {/* Brand Logo */}
      <motion.div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onShowInfoModal("Welcome to Chativ", "Chativ is a digital canvas representing technology crafted for humans, not simply for machine logic. Perfect alignment, responsive spacing, and fluid aesthetics.")}
        whileHover={{ scale: 1.01 }}
        id="nav-logo"
      >
        <div 
          className="w-8 h-8 flex items-center justify-center transform rotate-45 rounded-sm"
          style={{ background: 'linear-gradient(90deg, #ff4d00 0%, #b32400 100%)' }}
        >
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-white">
          Chativ
        </span>
      </motion.div>


      {/* Navigation Pill Container */}
      <nav 
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        className="hidden md:flex items-center px-2 py-1 space-x-1 border border-white/10 rounded-xl relative" 
        ref={dropdownRef}
      >
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative">
            <button
              onClick={() => handleNavClick(item)}
              className={`px-4 py-2 hover:bg-white/5 rounded-lg transition text-xs font-medium text-gray-200 cursor-pointer flex items-center gap-1 ${
                item.hasDropdown && isFeaturesOpen ? 'bg-white/5 text-white' : ''
              }`}
              id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span>{item.label}</span>
              {item.hasDropdown ? (
                <span className="ml-0.5 text-[8px] opacity-60">▼</span>
              ) : null}
            </button>


            {/* Interactive Dropdown Menu */}
            <AnimatePresence>
              {item.hasDropdown && isFeaturesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2.5 w-64 rounded-2xl bg-neutral-950/95 border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-50 text-left"
                >
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-neutral-500 font-mono font-bold border-b border-white/5 mb-1.5">
                    Explore Capabilities
                  </div>
                  
                  {/* Dropdown Items */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setIsFeaturesOpen(false);
                        onShowInfoModal("Sub-pixel Glass Layout", "Superbly responsive borders utilizing thin layout constraints of 1px solid white/10 layer combined with backdrop glassmorphism.");
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/20 text-[#FF4D00] flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-[#FF4D00] transition">Aesthetic Grid</div>
                        <div className="text-[10px] text-neutral-400">Glass UI & subtle shadows</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsFeaturesOpen(false);
                        onShowInfoModal("Ambient Video Synthesis", "Cinematic streaming backdrops rendered with optimal hardware decode and non-blocking layout overlays.");
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-950/40 border border-orange-500/20 text-[#FF6A00] flex items-center justify-center">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-[#FF6A00] transition">Cinematic Frame</div>
                        <div className="text-[10px] text-neutral-400">Muted & looped HTML5 streams</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsFeaturesOpen(false);
                        onShowInfoModal("Real-time Analytics", "Dynamic state models tracking active user engagement with feedback curves.");
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-500/20 text-yellow-500 flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-yellow-500 transition">Metrics Engine</div>
                        <div className="text-[10px] text-neutral-400">Interactive stat calculation</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Time Display & Call to Action */}
      <div className="flex items-center gap-6">
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
          {usaTime}
        </span>

        <motion.button
          onClick={onGetStartedClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-semibold text-xs hover:bg-gray-100 transition shadow-lg cursor-pointer"
          id="btn-nav-get-started"
        >
          Get Started
        </motion.button>
      </div>

    </header>
  );
}
