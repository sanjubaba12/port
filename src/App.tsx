/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { NavBar } from './components/NavBar';
import { HeroTitle } from './components/HeroTitle';
import { StatsRow } from './components/StatsRow';
import { GetStartedModal } from './components/GetStartedModal';
import { InfoModal } from './components/InfoModal';
import { StatModel } from './types';

// Curated top-performing assets
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
];

const PARTNERS = [
  { name: 'BookStore', desc: 'Bespoke global publishing marketplace' },
  { name: 'zantic', desc: 'Hardware-accelerated analytical tools' },
  { name: 'Crona', desc: 'Modern decentralized fintech platforms' },
  { name: 'Mercury', desc: 'Enterprise telemetry routing architectures' },
  { name: 'Wager', desc: 'Stochastic predictive analysis models' },
];

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  
  // Info Modal states
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [infoTitle, setInfoTitle] = useState<string>('');
  const [infoDesc, setInfoDesc] = useState<string>('');

  // Floating notifications/alerts for micro-interactions
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setActiveNotification(message);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  const handleShowInfoModal = (title: string, desc: string) => {
    setInfoTitle(title);
    setInfoDesc(desc);
    setIsInfoOpen(true);
  };

  const handleStatClick = (stat: StatModel) => {
    const portfolioDetail = stat.isRedTheme
      ? `Our audited metrics verify that 98% of our customers experience dramatic conversion rate multipliers in their high-fidelity digital platforms. Fully supported metrics in USA, Europe and Asia.`
      : `Complete showcase portfolio comprising 150+ successfully delivered custom systems spanning FinTech widgets, dynamic interactive globes, and immersive WebGL backdrops.`;
    
    handleShowInfoModal(`${stat.label} Stats`, portfolioDetail);
  };

  const handlePartnerClick = (name: string, description: string) => {
    showNotification(`Verifying brand registry for ${name}...`);
    handleShowInfoModal(
      `${name} Collaboration`,
      `We teamed up with ${name}, supporting their transition from standard corporate landing setups into dynamic video backdrops and 120 FPS performance layouts. ${description}`
    );
  };

  return (
    <div className="relative min-h-screen text-white bg-black select-none overflow-x-hidden flex flex-col justify-between" id="chativ-main-workspace shadow-inner">
      
      {/* 1. Cinematic Background Video Loop */}
      <BackgroundVideo videoUrl="https://res.cloudinary.com/doqvu3nfb/video/upload/v1779782960/video_t5akgs.mp4" />

      {/* Main Content Viewport Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col min-h-screen justify-between p-2 flex-grow">
        
        {/* 2. Top Glassy Header / Navigation */}
        <NavBar 
          onGetStartedClick={() => setIsGetStartedOpen(true)} 
          onShowInfoModal={handleShowInfoModal}
        />

        {/* 3. Hero content and description modules */}
        <main className="px-6 sm:px-12 pt-10 pb-16 flex-grow flex flex-col justify-center gap-12 sm:gap-16">
          
          {/* Main Title ("Technology Crafted for All Not Machines") */}
          <HeroTitle />

          {/* Subtext description, Get Started group + Partners in a clean flexible layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            
            {/* Left Col: Explainer description and call to actions */}
            <div className="max-w-md text-left">
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We create clear, intuitive, and accessible digital experiences shaped by real human behavior.
              </p>

              {/* Get started interactive gradient button and avatars */}
              <div className="flex items-center gap-8">
                
                {/* Circular styled arrow interactive gradient button */}
                <motion.button
                  onClick={() => setIsGetStartedOpen(true)}
                  style={{ background: 'linear-gradient(90deg, #ff4d00 0%, #b32400 100%)' }}
                  className="pl-6 pr-1.5 py-1.5 rounded-full flex items-center justify-between gap-4 cursor-pointer text-white select-none hover:opacity-90 transition-opacity group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="btn-hero-cta"
                >
                  <span className="font-semibold text-sm tracking-tight text-white select-none">
                    Get started
                  </span>
                  
                  {/* Glowing Arrow disk */}
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black shadow-inner">
                    <ArrowRight className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                  </div>
                </motion.button>

                {/* Social Proof Curated Avatars */}
                <div 
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => handleShowInfoModal("Verified Customers", "Over 900+ customers have successfully optimized their landing assets utilizing the responsive structures powered by Chativ.")}
                  title="Show customer consensus statistics"
                >
                  <div className="flex -space-x-3">
                    {AVATARS.map((avatar, i) => (
                      <motion.img
                        key={i}
                        src={avatar}
                        alt="Audited Client"
                        className="w-9 h-9 rounded-full border-2 border-black object-cover relative select-none"
                        whileHover={{ scale: 1.15, zIndex: 30 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                  <div className="text-[11px] font-sans">
                    <div className="font-bold text-white tracking-tight">
                      900+ Happy Clients
                    </div>
                    <div className="text-gray-400 font-medium tracking-tight">
                      Over 5 years
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Col: Client Partner showcase logos with responsive alignments and active highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full lg:w-auto text-left lg:text-right mb-2"
              id="partners-board"
            >
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                Our Partners
              </p>
              
              <div className="flex flex-wrap lg:justify-end items-center gap-6 text-lg font-bold opacity-60 text-white">
                {PARTNERS.map((partner) => (
                  <motion.span
                    key={partner.name}
                    onClick={() => handlePartnerClick(partner.name, partner.desc)}
                    className="hover:opacity-100 hover:text-white cursor-pointer select-none transition-opacity duration-300 relative group py-1"
                    whileHover={{ scale: 1.05 }}
                    title={`Click to analyze ${partner.name} partnership`}
                  >
                    {partner.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* 4. Stat row with absolute pixel sizing counters */}
          <StatsRow onStatClick={handleStatClick} />

        </main>
      </div>

      {/* Floating toast-like feedback for clicking brand log */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4.5 py-3 rounded-2xl bg-neutral-900 border border-white/15 shadow-xl text-xs font-medium text-white backdrop-blur-xl"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span>{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive lead modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

      {/* Immersive segment info modals */}
      <InfoModal
        isOpen={isInfoOpen}
        title={infoTitle}
        description={infoDesc}
        onClose={() => setIsInfoOpen(false)}
      />

    </div>
  );
}
