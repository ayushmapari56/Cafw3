import React from 'react';
import { UtensilsCrossed, Calendar, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenCart,
  cartCount,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3">
        <nav className="bg-[#0e1017]/90 backdrop-blur-xl border border-stone-800/80 hover:border-amber-500/30 rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between shadow-2xl transition-all">
          {/* Brand mark */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded-lg"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/40 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-serif text-base sm:text-lg tracking-wider font-semibold text-white">
                  AURA
                </span>
                <span className="text-[9px] tracking-widest uppercase font-mono text-amber-400/80">
                  EST. 2026
                </span>
              </div>
              <p className="text-[9px] tracking-widest uppercase text-stone-400 mt-0.5 leading-none">
                Culinary Atelier & Gastronomy
              </p>
            </div>
          </a>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-medium text-stone-300">
            <a
              href="#hero"
              className="hover:text-amber-400 transition-colors tracking-wide py-0.5 border-b border-transparent hover:border-amber-400"
            >
              Signature
            </a>
            <a
              href="#deconstructed"
              className="hover:text-amber-400 transition-colors tracking-wide py-0.5 border-b border-transparent hover:border-amber-400"
            >
              Anatomy of Flavor
            </a>
            <a
              href="#tasting-menu"
              className="hover:text-amber-400 transition-colors tracking-wide py-0.5 border-b border-transparent hover:border-amber-400"
            >
              Seven Courses
            </a>
            <a
              href="#flavor-matrix"
              className="hover:text-amber-400 transition-colors tracking-wide py-0.5 border-b border-transparent hover:border-amber-400"
            >
              Sensory Matrix
            </a>
            <a
              href="#atelier"
              className="hover:text-amber-400 transition-colors tracking-wide py-0.5 border-b border-transparent hover:border-amber-400"
            >
              The Atelier
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Tasting journal / cart button */}
            <button
              onClick={onOpenCart}
              aria-label="View tasting selections"
              className="relative p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 transition-all flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Table Reservation CTA */}
            <button
              onClick={onOpenReservation}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Reserve Table</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
