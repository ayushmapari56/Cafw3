import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Award, ShieldCheck } from 'lucide-react';

export const ChefAtelierSection: React.FC = () => {
  return (
    <section id="atelier" className="relative py-28 overflow-hidden bg-gradient-to-b from-[#0b0c10] to-[#08090c]">
      {/* Background ambient flame glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>The Hearth & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Atelier Manifesto</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white text-balance">
            Crafted at the intersection of Japanese precision & Parisian technique.
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden h-72 sm:h-80 border border-stone-800 shadow-2xl relative"
            >
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Chef placing delicate micro-herbs with tweezers"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-mono text-amber-300">Precision Plating · 0.1mm Tolerance</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden h-72 sm:h-80 border border-stone-800 shadow-2xl mt-8 relative"
            >
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                alt="Binchotan white oak embers and hearth kitchen flame"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-mono text-amber-300">Kishu Binchotan Hearth · 900°C</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Culinary Philosophy Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <blockquote className="font-serif text-xl sm:text-2xl text-stone-200 italic leading-relaxed font-light border-l border-amber-500/40 pl-6">
              "We do not merely cook dishes; we choreograph ephemeral sensory moments where smoke, botanical acids, and thermal tension reveal the purest soul of the earth."
            </blockquote>

            <div className="text-xs text-stone-400 font-mono tracking-wider pl-6">
              — CHEF HIROSHI VANCE & CÉLESTE DURAND, CO-FOUNDING ATELIER CHEFS
            </div>

            <div className="space-y-4 pt-4">
              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Closed-Loop Biodynamic Terroir
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed mt-1">
                    Every vegetable, herb, and flower is gathered at sunrise from our private biodynamic greenhouse or foraged by master mycologists in subalpine forests.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    12-Seat Intimate Chef Counter
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed mt-1">
                    An exclusive single-seating theatrical counter. Witness every flame sear, liquid nitrogen transformation, and tableside aroma unveiling up close.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex items-start gap-4 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Rare Vintage Sommelier Vault
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed mt-1">
                    Over 1,400 curated grower Champagnes, natural amphora orange vintages, and legendary Grand Crus aged in temperature-stabilized granite cellars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
