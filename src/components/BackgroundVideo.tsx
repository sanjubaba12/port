/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, VolumeX, Volume2, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackgroundVideoProps {
  videoUrl: string;
}

export function BackgroundVideo({ videoUrl }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Attempt autoplay logic on mount or video change
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Autoplay blocked or failed, waiting for user interaction:", error);
          setIsPlaying(false);
        });
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // fallback
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      
      {/* Dark fallback background */}
      <div className="absolute inset-0 bg-[#070707]" />

      {/* Video element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-10 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}

      {/* Glassy Cinematic Scrim for overlay legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60 backdrop-blur-[2px] z-20" />

      {/* Control overlay on the bottom left/right corner, using cursor pointer events */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3 z-30 pointer-events-auto">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 text-white/70 text-xs font-mono border border-white/10 backdrop-blur-md"
            >
              <Film className="w-3.5 h-3.5 animate-pulse text-[#FF4D00]" />
              <span>Streaming Ambient Media...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer backdrop-blur-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isPlaying ? "Pause Ambient" : "Play Ambient"}
          id="btn-video-play"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </motion.button>

        <motion.button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer backdrop-blur-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isMuted ? "Unmute Ambient" : "Mute Ambient"}
          id="btn-video-mute"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  );
}
