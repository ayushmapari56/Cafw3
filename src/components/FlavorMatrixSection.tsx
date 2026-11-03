import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FLAVOR_PROFILES } from '../data/culinaryData';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const FlavorMatrixSection: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(FLAVOR_PROFILES[0].id);
  const activeProfile = FLAVOR_PROFILES.find((p) => p.id === selectedProfileId) || FLAVOR_PROFILES[0];

  return (
    <section id="flavor-matrix" className="relative py-28 bg-[#0b0c10] border-t border-stone-800/80 overflow-hidden">
      {/* Background radial atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeProfile.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Sensory Architecture & Terroir</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            The Botanical & Molecular Matrix
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
            Our atelier tests flavor synergy across volatile aromatic compounds, thermal reaction kinetics, and woodfire smoke chemistry.
          </p>
        </div>

        {/* Interactive Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Category Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {FLAVOR_PROFILES.map((profile) => {
              const isActive = profile.id === selectedProfileId;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 border-amber-500 shadow-xl'
                      : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: profile.accentColor }}
                      />
                      <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {profile.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-1 pl-4.5">
                      {profile.notes}
                    </p>
                  </div>

                  <div className="text-right pl-4">
                    <span className="text-xs font-mono text-amber-400 tabular-nums">
                      {profile.intensity}%
                    </span>
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest">
                      Resonance
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Profile Detailed Radar & Sensory Resonance Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel-elevated p-8 sm:p-10 rounded-3xl space-y-6 relative overflow-hidden"
              >
                {/* Accent border strip at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
                  style={{ backgroundColor: activeProfile.accentColor }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                      Sensory Resonance Profile
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-white mt-1">
                      {activeProfile.title}
                    </h3>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono text-amber-300">
                    Aromatic Index: {activeProfile.intensity}/100
                  </div>
                </div>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {activeProfile.description}
                </p>

                {/* Compound Breakdown Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Palate Persistence & Finish</span>
                    <span className="font-mono text-amber-400">{activeProfile.intensity}s linger</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeProfile.intensity}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeProfile.accentColor }}
                    />
                  </div>
                </div>

                {/* Key Volatile Notes */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dominant Volatiles & Scent Compounds</span>
                  </div>
                  <p className="text-xs text-stone-200 font-medium">
                    {activeProfile.notes}
                  </p>
                </div>

                {/* Synchronized Menu Pairings */}
                <div className="pt-2">
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-3">
                    Synchronized Dish & Cellar Pairings
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeProfile.pairings.map((pairing) => (
                      <div
                        key={pairing}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-medium truncate">{pairing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
