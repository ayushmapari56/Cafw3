import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { DECONSTRUCTED_LAYERS } from '../data/culinaryData';
import { DeconstructedLayer } from '../types/culinary';
import { Layers, Thermometer, Globe, Sparkles, Sliders } from 'lucide-react';

export const DeconstructedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<DeconstructedLayer>(DECONSTRUCTED_LAYERS[2]);
  const [manualExpansion, setManualExpansion] = useState<number>(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll driven dynamic expansion factor
  const scrollSpread = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.4, 1.3, 0.7]);

  return (
    <section
      id="deconstructed"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-[#08090c] via-[#0e1017] to-[#08090c] border-y border-stone-800/60 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Scroll-Driven Deconstruction</span>
              <span aria-hidden="true">·</span>
              <span>Layer Isolation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white text-balance">
              The Anatomy of Flavor
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              As you scroll, watch each culinary stratum separate in mid-air. Click any layer to reveal its thermal calibration, texture science, and terroir.
            </p>
          </div>

          {/* Manual layer separation override slider */}
          <div className="flex items-center gap-3 p-3 bg-stone-900/80 border border-stone-800 rounded-xl backdrop-blur-md self-start md:self-auto">
            <Sliders className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] text-stone-300 font-medium">Layer Separation</span>
                <span className="text-[11px] font-mono text-amber-400">{Math.round(manualExpansion * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={manualExpansion}
                onChange={(e) => setManualExpansion(parseFloat(e.target.value))}
                className="w-36 accent-amber-500 cursor-pointer h-1.5 bg-stone-700 rounded-lg mt-1"
              />
            </div>
          </div>
        </div>

        {/* Main Stage: Floating Exploded Dish on the Left/Center, Detailed Layer Card on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Floating Exploded Layers Stack */}
          <div className="lg:col-span-7 relative h-[560px] sm:h-[620px] flex items-center justify-center">
            {/* Guide axis lines */}
            <div className="absolute top-8 bottom-8 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent -translate-x-1/2 pointer-events-none" />

            {DECONSTRUCTED_LAYERS.map((layer) => {
              const isSelected = activeLayer.id === layer.id;
              // Parallax offset per layer multiplied by manual + scroll factors
              const finalOffsetY = layer.offsetY * manualExpansion;

              return (
                <motion.div
                  key={layer.id}
                  style={{
                    y: finalOffsetY,
                    rotate: layer.rotation,
                    zIndex: 20 - layer.layerNumber,
                  }}
                  animate={{
                    scale: isSelected ? 1.08 : 0.98,
                    filter: isSelected ? 'drop-shadow(0 20px 30px rgba(245, 158, 11, 0.3))' : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.7))',
                  }}
                  whileHover={{ scale: 1.06, cursor: 'pointer' }}
                  onClick={() => setActiveLayer(layer)}
                  className="absolute transition-all duration-300 w-64 sm:w-80 group"
                >
                  {/* Layer Disc */}
                  <div
                    className={`relative rounded-3xl p-3 backdrop-blur-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-stone-900/90 border-amber-500 shadow-2xl'
                        : 'bg-stone-950/80 border-stone-800/90 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Image Thumbnail cut-out */}
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-amber-500/30">
                        <img
                          src={layer.image}
                          alt={layer.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Title & layer number */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                          <span>STRATUM 0{layer.layerNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-400 truncate">{layer.temperature.split('/')[0]}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate mt-0.5">
                          {layer.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 truncate">
                          {layer.subtitle}
                        </p>
                      </div>

                      {/* Indicator pill */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {layer.layerNumber}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Layer Dossier */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel-elevated p-8 rounded-3xl space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                    <span>STRATUM 0{activeLayer.layerNumber} / 05</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
                      Active Focal Stratum
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-normal text-white mt-2">
                    {activeLayer.title}
                  </h3>
                  <p className="text-amber-200/90 text-sm mt-1 font-medium">
                    {activeLayer.subtitle}
                  </p>
                </div>

                <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-800 shadow-lg">
                  <img
                    src={activeLayer.image}
                    alt={activeLayer.title}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                </div>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {activeLayer.description}
                </p>

                {/* Technical data table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-800 text-xs">
                  <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                    <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px]">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Thermal Serving State</span>
                    </div>
                    <div className="text-white font-medium mt-1">
                      {activeLayer.temperature}
                    </div>
                  </div>

                  <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                    <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Acoustic Texture</span>
                    </div>
                    <div className="text-white font-medium mt-1">
                      {activeLayer.texture}
                    </div>
                  </div>

                  <div className="sm:col-span-2 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                    <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px]">
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span>Terroir & Artisan Provenance</span>
                    </div>
                    <div className="text-amber-300 font-medium mt-1">
                      {activeLayer.origin}
                    </div>
                  </div>
                </div>

                {/* Next layer fast stepper */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-400">Step through layers:</span>
                  <div className="flex gap-1.5">
                    {DECONSTRUCTED_LAYERS.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => setActiveLayer(layer)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          activeLayer.id === layer.id
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {layer.layerNumber}
                      </button>
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
