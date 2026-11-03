import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Wine, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ReservationData } from '../types/culinary';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState<ReservationData>({
    experience: 'The 7-Course Atelier Journey',
    guests: 2,
    date: '2026-11-15',
    time: '19:30',
    seating: 'Chef Table',
    specialRequests: '',
    supplements: ['Reserve Grand Cru Wine Pairing'],
    customerName: '',
    email: '',
    phone: '',
  });

  const tiers = [
    {
      name: 'The 7-Course Atelier Journey',
      price: 245,
      desc: 'Our quintessential seasonal choreography with live hearth and tableside aroma infusions.',
    },
    {
      name: 'The 10-Course Chef Counter Exclusive',
      price: 385,
      desc: '12 seats only. Direct interaction with Chef Vance, ultra-rare seasonal foraged ingredients, and imperial caviar.',
    },
    {
      name: 'The Botanical & Ocean Symphony',
      price: 320,
      desc: 'Pescatarian and botanical celebration featuring Hokkaido scallops, glacier toothfish, and floral distillations.',
    },
  ];

  const timeslots = ['17:30', '18:15', '19:30', '20:15', '21:00'];

  const availableSupplements = [
    { id: 'truffle', name: 'Fresh Winter Périgord Truffle Shaving', price: 75 },
    { id: 'wine', name: 'Reserve Grand Cru Wine Pairing', price: 160 },
    { id: 'caviar', name: 'Imperial Ossetra Caviar Service', price: 95 },
  ];

  const toggleSupplement = (suppName: string) => {
    setFormData((prev) => {
      const exists = prev.supplements.includes(suppName);
      return {
        ...prev,
        supplements: exists
          ? prev.supplements.filter((s) => s !== suppName)
          : [...prev.supplements, suppName],
      };
    });
  };

  const selectedTier = tiers.find((t) => t.name === formData.experience) || tiers[0];
  const supplementTotal = formData.supplements.reduce((sum, suppName) => {
    const item = availableSupplements.find((s) => s.name === suppName);
    return sum + (item ? item.price : 0);
  }, 0);
  const estimatedTotal = (selectedTier.price + supplementTotal) * formData.guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.email) return;
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#10121a] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sensory Dining Reservation</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-normal mt-0.5">
                {step === 'form' ? 'Reserve Your Table' : 'Reservation Confirmed'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Experience Tier */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-2">
                    01. Select Tasting Tier
                  </label>
                  <div className="space-y-2.5">
                    {tiers.map((tier) => (
                      <div
                        key={tier.name}
                        onClick={() => setFormData({ ...formData, experience: tier.name })}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          formData.experience === tier.name
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                            : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm text-white flex items-center gap-2">
                            <span>{tier.name}</span>
                            {formData.experience === tier.name && (
                              <Check className="w-4 h-4 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                            {tier.desc}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-base text-amber-300 tabular-nums">
                            ${tier.price}
                          </span>
                          <span className="text-[10px] text-stone-500 block">/ guest</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Date, Time & Guests Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Guests</span>
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: parseInt(e.target.value) })
                      }
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min="2026-11-02"
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Time</span>
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {timeslots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Seating Environment */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-2">
                    02. Seating Environment
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(['Chef Table', 'Main Dining Room', 'Private Botanical Salon'] as const).map(
                      (seat) => (
                        <button
                          type="button"
                          key={seat}
                          onClick={() => setFormData({ ...formData, seating: seat })}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                            formData.seating === seat
                              ? 'bg-amber-500 text-stone-950 font-semibold border-amber-400 shadow-md'
                              : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          {seat}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* 4. Supplements */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-stone-300 mb-2 flex items-center gap-1.5">
                    <Wine className="w-3.5 h-3.5 text-amber-400" />
                    <span>Curated Sommelier Enhancements (Optional)</span>
                  </label>
                  <div className="space-y-2">
                    {availableSupplements.map((supp) => {
                      const selected = formData.supplements.includes(supp.name);
                      return (
                        <div
                          key={supp.id}
                          onClick={() => toggleSupplement(supp.name)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                            selected
                              ? 'bg-amber-500/10 border-amber-500/60 text-white'
                              : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                selected
                                  ? 'bg-amber-500 text-stone-950 font-bold'
                                  : 'border border-stone-700'
                              }`}
                            >
                              {selected && '✓'}
                            </div>
                            <span>{supp.name}</span>
                          </div>
                          <span className="font-mono text-amber-400 tabular-nums">
                            +${supp.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Contact Information */}
                <div className="space-y-3 pt-2 border-t border-stone-800">
                  <div className="text-xs uppercase tracking-wider font-medium text-stone-300">
                    03. Guest Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name (e.g. Alex Laurent)"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Contact (for booking concierge SMS)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <textarea
                    rows={2}
                    placeholder="Dietary allergies, celebrations, or special seating requests..."
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequests: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {/* Price summary & Submit */}
                <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">
                      Estimated Experience Total ({formData.guests} Guests)
                    </span>
                    <span className="font-serif text-2xl text-amber-400 font-normal tabular-nums">
                      ${estimatedTotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                  >
                    <span>Confirm Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* Confirmation Screen */
              <div className="py-6 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    Reservation Confirmed · Reference #AUR-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <h4 className="font-serif text-3xl font-normal text-white">
                    We eagerly await your arrival, {formData.customerName}.
                  </h4>
                  <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                    A confirmation email and sommelier welcome dossier have been dispatched to{' '}
                    <strong className="text-amber-300 font-mono">{formData.email}</strong>.
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl max-w-md mx-auto text-left text-xs space-y-3">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Experience:</span>
                    <span className="text-white font-medium">{formData.experience}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Seating & Date:</span>
                    <span className="text-white font-medium">
                      {formData.seating} · {formData.date} at {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Party Size:</span>
                    <span className="text-white font-medium">{formData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-stone-400">Total Experience:</span>
                    <span className="text-amber-400 font-mono font-bold text-sm tabular-nums">
                      ${estimatedTotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
