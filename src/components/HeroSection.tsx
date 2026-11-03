import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SIGNATURE_HERO_DISHES } from '../data/culinaryData';
import { DishItem } from '../types/culinary';
import { Wine, ChevronDown, Sparkles, Plus, Check } from 'lucide-react';

interface HeroSectionProps {
  onSelectDishForDeconstruct: (dish: DishItem) => void;
  onAddToCart: (dish: DishItem) => void;
  isInCart: (id: string) => boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectDishForDeconstruct,
  onAddToCart,
  isInCart,
}) => {
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const currentDish = SIGNATURE_HERO_DISHES[selectedDishIndex];

  // Scroll animations specific to hero plate
  const { scrollY } = useScroll();
  const heroPlateY = useTransform(scrollY, [0, 800], [0, 240]);
  const heroPlateRotate = useTransform(scrollY, [0, 800], [0, 25]);
  const heroPlateScale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  const handleNextDish = (index: number) => {
    setSelectedDishIndex(index);
    onSelectDishForDeconstruct(SIGNATURE_HERO_DISHES[index]);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        {/* Subtle kicker */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400/90 font-mono mb-4">
          <span>Haute Gastronomie</span>
          <span aria-hidden="true">·</span>
          <span>Kinetic Culinary Theater</span>
          <span aria-hidden="true">·</span>
          <span>Tokyo & Paris Atelier</span>
        </div>

        {/* Split Grid: Left story & interactive selector, Right floating interactive plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Dish details */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white text-balance">
              Where seasonal botanicals dance with fire.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light max-w-xl">
              Immerse yourself in a living culinary stage where ingredients
              unbind, hover, and reassemble as you move through our sensory
              landscape.
            </p>

            {/* Dish selection segmented control */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                Select Signature Creation
              </div>
              <div className="flex flex-wrap gap-2 p-1.5 bg-stone-900/80 border border-stone-800 rounded-xl backdrop-blur-md">
                {SIGNATURE_HERO_DISHES.map((dish, idx) => (
                  <button
                    key={dish.id}
                    onClick={() => handleNextDish(idx)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      selectedDishIndex === idx
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                    }`}
                  >
                    {dish.name.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected dish spotlight card */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                    {currentDish.courseNumber}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white mt-1">
                    {currentDish.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 italic mt-0.5">
                    {currentDish.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif text-white tabular-nums">
                    ${currentDish.price}
                  </div>
                  <div className="text-[11px] text-stone-400">per guest</div>
                </div>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {currentDish.description}
              </p>

              {/* Flavor notes clean typography */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 pt-1 border-t border-stone-800">
                <span className="text-amber-400 font-medium">Palette:</span>
                {currentDish.flavors.map((flavor, i) => (
                  <React.Fragment key={flavor}>
                    <span>{flavor}</span>
                    {i < currentDish.flavors.length - 1 && (
                      <span className="text-stone-600" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Sommelier Pairing Note */}
              <div className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80 text-xs text-stone-300">
                <Wine className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Sommelier Pairing: </span>
                  <span className="text-amber-200 font-medium">{currentDish.winePairing.wine}</span>{' '}
                  <span className="text-stone-400 font-mono">({currentDish.winePairing.year})</span> — {currentDish.winePairing.notes}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(currentDish)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isInCart(currentDish.id)
                      ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg hover:shadow-amber-500/20'
                  }`}
                >
                  {isInCart(currentDish.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Tasting Selection</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Tasting Selection (${currentDish.price})</span>
                    </>
                  )}
                </button>

                <a
                  href="#deconstructed"
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors flex items-center gap-2"
                >
                  <span>Deconstruct</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic 3D Floating Stage with rotating dish */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient circular decorative rings */}
            <div className="absolute w-[460px] h-[460px] rounded-full border border-amber-500/10 pointer-events-none animate-spin [animation-duration:90s]" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-stone-700/30 pointer-events-none" />

            {/* Kinetic floating center plate */}
            <motion.div
              style={{
                y: heroPlateY,
                rotateZ: heroPlateRotate,
                scale: heroPlateScale,
                opacity: heroOpacity,
              }}
              className="relative z-20 group"
            >
              {/* Backlight halo */}
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-3xl scale-95" />

              <div className="relative w-72 sm:w-96 md:w-[420px] aspect-square rounded-full p-2 bg-gradient-to-b from-stone-800/60 to-stone-950/90 border border-amber-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
                <img
                  src={currentDish.image}
                  alt={currentDish.alt}
                  className="w-full h-full object-cover rounded-full shadow-inner select-none pointer-events-none filter contrast-110 brightness-105"
                />

                {/* Glass reflection sheen */}
                <div className="absolute inset-0 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />

                {/* Floating orbiting tag 1 */}
                <motion.div
                  animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 right-4 glass-panel px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-[11px] font-medium text-amber-300 shadow-xl backdrop-blur-md flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Kishu Binchotan Sear</span>
                </motion.div>

                {/* Floating orbiting tag 2 */}
                <motion.div
                  animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-3 left-6 glass-panel px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-[11px] font-medium text-amber-300 shadow-xl backdrop-blur-md flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Winter Périgord Truffle</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="pt-16 pb-4 flex flex-col items-center justify-center text-center">
          <a
            href="#deconstructed"
            className="group flex flex-col items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest font-mono">
              Scroll down to explode the dish into layers
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="p-1.5 rounded-full bg-stone-900/80 border border-stone-800 group-hover:border-amber-500/40"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
};
