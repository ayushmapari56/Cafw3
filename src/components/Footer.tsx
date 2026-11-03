import React, { useState } from 'react';
import { UtensilsCrossed, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#07080b] border-t border-stone-900 text-stone-400 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          {/* Atelier Brand column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold tracking-wider text-white">
                  AURA
                </span>
                <p className="text-[10px] tracking-widest uppercase text-stone-400">
                  Haute Gastronomie & Botanical Lab
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 font-light leading-relaxed max-w-sm">
              A kinetic culinary sanctuary dedicated to seasonal micro-harvests, binchotan fire craft, and multisensory gastronomy.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <span>Three Michelin Stars (2024–2026)</span>
              <span aria-hidden="true">·</span>
              <span>Relais & Châteaux Grand Chef</span>
            </div>
          </div>

          {/* Locations */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Atelier Sanctuaries
            </div>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-white text-sm">Tokyo · Roppongi Hills</h5>
                <p className="text-stone-400 mt-0.5">6-10-1 Roppongi, Minato City, Tokyo 106-0032</p>
                <p className="text-stone-400 mt-0.5">Seating: Tuesday – Sunday, 17:30 & 20:30</p>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm">Paris · Saint-Germain</h5>
                <p className="text-stone-400 mt-0.5">42 Rue de Grenelle, 75007 Paris, France</p>
                <p className="text-stone-400 mt-0.5">Seating: Wednesday – Sunday, 19:00 & 21:30</p>
              </div>
            </div>
          </div>

          {/* Seasonal Journal Signup */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              The Tasting Journal
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive priority releases for upcoming seasonal menu rotations and guest masterclass allocations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>You are on the Atelier Priority Register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-amber-500 text-stone-200 hover:text-stone-950 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Journal Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © 2026 AURA Atelier Gastronomique. All culinary compositions protected.
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-amber-400 transition-colors">
              Back to Top
            </a>
            <span aria-hidden="true">·</span>
            <span>Zero-Waste Kitchen Certification</span>
            <span aria-hidden="true">·</span>
            <span>Fair Trade Direct Farms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
