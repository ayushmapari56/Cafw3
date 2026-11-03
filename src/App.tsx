import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingFoodCanvas } from './components/FloatingFoodCanvas';
import { HeroSection } from './components/HeroSection';
import { DeconstructedSection } from './components/DeconstructedSection';
import { TastingMenuSection } from './components/TastingMenuSection';
import { FlavorMatrixSection } from './components/FlavorMatrixSection';
import { ChefAtelierSection } from './components/ChefAtelierSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { TastingCartDrawer } from './components/TastingCartDrawer';
import { MotionControlPill } from './components/MotionControlPill';
import { DishItem } from './types/culinary';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [motionMultiplier, setMotionMultiplier] = useState(1.0);
  const [surgeKey, setSurgeKey] = useState(0);

  // Tasting cart items state
  const [cartItems, setCartItems] = useState<{ dish: DishItem; quantity: number }[]>([
    // Pre-populate with signature Wagyu and Scallop for rich instant experience
  ]);

  const handleAddToCart = (dish: DishItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { dish: DishItem; quantity: number }[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const isInCart = (dishId: string) => {
    return cartItems.some((item) => item.dish.id === dishId);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleTriggerSurge = () => {
    setSurgeKey((prev) => prev + 1);
    setMotionMultiplier(1.8);
    setTimeout(() => {
      setMotionMultiplier(1.0);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-stone-100 relative selection:bg-amber-500/20 selection:text-amber-300">
      {/* 1. Scroll-Driven Moving Food Animation Canvas */}
      <FloatingFoodCanvas
        key={surgeKey}
        motionSpeedMultiplier={motionMultiplier}
        interactivePhysics={true}
      />

      {/* 2. Top Navigation */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* 3. Main Content Screens */}
      <main className="relative z-10">
        {/* Screen 1: The Overture / Hero Stage */}
        <HeroSection
          onSelectDishForDeconstruct={() => {}}
          onAddToCart={handleAddToCart}
          isInCart={isInCart}
        />

        {/* Screen 2: Deconstructed Layers in Motion */}
        <DeconstructedSection />

        {/* Screen 3: The Seven-Course Tasting Sequence */}
        <TastingMenuSection
          onAddToCart={handleAddToCart}
          isInCart={isInCart}
        />

        {/* Screen 4: Sensory Flavor & Molecular Architecture */}
        <FlavorMatrixSection />

        {/* Screen 5: The Chef Atelier, Hearth Fire & Sourcing */}
        <ChefAtelierSection />
      </main>

      {/* 4. Atelier Footer */}
      <Footer />

      {/* 5. Floating Interactive Velocity / Motion Control Widget */}
      <MotionControlPill
        currentMultiplier={motionMultiplier}
        onMultiplierChange={setMotionMultiplier}
        onTriggerSurge={handleTriggerSurge}
      />

      {/* 6. Sensory Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* 7. Slide-out Tasting Cart Drawer */}
      <TastingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToReservation={() => {
          setIsReservationOpen(true);
        }}
      />
    </div>
  );
}
