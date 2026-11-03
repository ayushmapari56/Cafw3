import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Wine, Plus, Minus } from 'lucide-react';
import { DishItem } from '../types/culinary';

interface TastingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { dish: DishItem; quantity: number }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToReservation: () => void;
}

export const TastingCartDrawer: React.FC<TastingCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToReservation,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );
  const serviceCharge = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + serviceCharge;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm"
        />

        {/* Slide-out Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#0f1117] border-l border-stone-800 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-white">
                    Tasting Journey
                  </h3>
                  <p className="text-xs text-stone-400">
                    {cartItems.length} {cartItems.length === 1 ? 'Curated Course' : 'Curated Courses'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-stone-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg text-white">Your Tasting Plan is Empty</h4>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                      Explore our Signature Dishes or the Seven-Course Sequence and add courses to curate your custom sensory experience.
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map(({ dish, quantity }) => (
                  <div
                    key={dish.id}
                    className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 flex gap-4 items-center group"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                          {dish.courseNumber}
                        </span>
                        <button
                          onClick={() => onRemoveItem(dish.id)}
                          className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-semibold text-white truncate mt-0.5">
                        {dish.name}
                      </h4>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                          <button
                            onClick={() => onUpdateQuantity(dish.id, -1)}
                            className="text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono text-white px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(dish.id, 1)}
                            className="text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-serif text-amber-300 font-medium tabular-nums">
                          ${dish.price * quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-900/80 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Courses Subtotal:</span>
                    <span className="text-white font-mono tabular-nums">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Atelier Hospitality & Prep (18%):</span>
                    <span className="text-white font-mono tabular-nums">${serviceCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-stone-800">
                    <span>Curated Total:</span>
                    <span className="text-amber-400 font-serif text-lg tabular-nums">
                      ${grandTotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToReservation();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                >
                  <span>Lock In Course Selection & Reserve Table</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
