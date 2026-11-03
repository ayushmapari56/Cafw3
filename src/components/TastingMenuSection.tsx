import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TASTING_COURSES } from '../data/culinaryData';
import { DishItem } from '../types/culinary';
import { Wine, Plus, Check, Utensils } from 'lucide-react';

interface TastingMenuSectionProps {
  onAddToCart: (dish: DishItem) => void;
  isInCart: (id: string) => boolean;
}

export const TastingMenuSection: React.FC<TastingMenuSectionProps> = ({
  onAddToCart,
  isInCart,
}) => {
  const [filter, setFilter] = useState<'all' | 'sea' | 'earth' | 'dessert'>('all');

  const filteredCourses = TASTING_COURSES.filter((course) => {
    if (filter === 'sea') return course.id === 'course-2' || course.id === 'course-4';
    if (filter === 'earth') return course.id === 'course-3' || course.id === 'course-5';
    if (filter === 'dessert') return course.id === 'course-1' || course.id === 'course-6' || course.id === 'course-7';
    return true;
  });

  return (
    <section id="tasting-menu" className="relative py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Autumn / Winter Tasting Symphony</span>
              <span aria-hidden="true">·</span>
              <span>7 Movements</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              The Seven-Course Sequence
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Each dish is calibrated to build upon the resonance of the preceding course, progressing from ethereal ocean salinity to deep binchotan warmth.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-900/80 border border-stone-800 rounded-xl backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Full Menu (7)
            </button>
            <button
              onClick={() => setFilter('sea')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'sea'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Ocean & Scallop
            </button>
            <button
              onClick={() => setFilter('earth')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'earth'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Hearth & Truffle
            </button>
            <button
              onClick={() => setFilter('dessert')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'dessert'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Botanical & Cacao
            </button>
          </div>
        </div>

        {/* Course Cards Grid with Scroll-Motion entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const added = isInCart(course.id);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-3xl overflow-hidden border border-stone-800/80 hover:border-amber-500/40 transition-all flex flex-col group shadow-xl"
              >
                {/* Image showcase with overlay and course number */}
                <div className="relative h-60 overflow-hidden bg-stone-950">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Course Number Badge */}
                  <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-xl border border-white/10 text-xs font-mono text-amber-300 backdrop-blur-md">
                    {course.courseNumber}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-xl border border-white/10 text-xs font-serif text-white backdrop-blur-md tabular-nums">
                    ${course.price}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-normal text-white group-hover:text-amber-300 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-xs text-amber-200/80 italic mt-0.5">
                      {course.tagline}
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed mt-2.5">
                      {course.description}
                    </p>
                  </div>

                  {/* Dietary & Flavor Tags */}
                  <div className="space-y-3 pt-3 border-t border-stone-800/80">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400">
                      {course.flavors.map((flv, idx) => (
                        <span key={flv}>
                          {flv}
                          {idx < course.flavors.length - 1 && (
                            <span className="text-stone-600 ml-1.5 mr-0.5">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Wine Pairing */}
                    <div className="flex items-start gap-2 text-xs bg-stone-950/70 p-2.5 rounded-xl border border-stone-800/70 text-stone-300">
                      <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-snug">
                        <span className="text-amber-200 font-medium">{course.winePairing.wine}</span>{' '}
                        <span className="text-stone-400 font-mono">({course.winePairing.year})</span>
                      </div>
                    </div>
                  </div>

                  {/* Add to tasting selection button */}
                  <button
                    onClick={() => onAddToCart(course)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      added
                        ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                        : 'bg-stone-900 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-700/60 hover:border-amber-500 shadow-md'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>In Tasting Plan</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Course (${course.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
