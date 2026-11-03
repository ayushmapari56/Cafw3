import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Wind, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

interface MotionControlPillProps {
  currentMultiplier: number;
  onMultiplierChange: (val: number) => void;
  onTriggerSurge: () => void;
}

export const MotionControlPill: React.FC<MotionControlPillProps> = ({
  currentMultiplier,
  onMultiplierChange,
  onTriggerSurge,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const speedOptions = [
    { label: 'Gentle', value: 0.6 },
    { label: 'Cinematic', value: 1.0 },
    { label: 'High Velocity', value: 1.8 },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.div
        layout
        className="glass-panel rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Toggle Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-stone-800/40 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <div className="flex items-center gap-2 text-xs">
            <Wind className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-stone-200">Food Scroll Velocity</span>
            <span className="font-mono text-amber-400 text-[11px]">
              {currentMultiplier}x
            </span>
          </div>

          <button className="text-stone-400 hover:text-white p-0.5 ml-1">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Expanded Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3.5 pt-1 border-t border-stone-800/80 space-y-3"
            >
              <div className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                Kinetic Parallax Rates
              </div>

              {/* Speed Buttons */}
              <div className="flex gap-1.5">
                {speedOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => onMultiplierChange(opt.value)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${
                      currentMultiplier === opt.value
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                        : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Instant Atmospheric Float Surge */}
              <button
                onClick={onTriggerSurge}
                className="w-full py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-amber-500/20 border border-stone-700/80 hover:border-amber-500/50 text-stone-300 hover:text-amber-300 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Trigger Ingredient Drift Wave</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
