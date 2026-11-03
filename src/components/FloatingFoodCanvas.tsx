import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { FLOATING_INGREDIENTS } from '../data/culinaryData';

interface FloatingFoodCanvasProps {
  motionSpeedMultiplier?: number;
  interactivePhysics?: boolean;
}

export const FloatingFoodCanvas: React.FC<FloatingFoodCanvasProps> = ({
  motionSpeedMultiplier = 1,
  interactivePhysics = true,
}) => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery smooth momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {/* Dynamic atmospheric ambient food particles */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Floating ingredients running throughout whole scroll journey */}
      {FLOATING_INGREDIENTS.map((item, index) => {
        return (
          <FloatingFoodItem
            key={item.id}
            item={item}
            index={index}
            smoothProgress={smoothProgress}
            smoothMouseX={smoothMouseX}
            smoothMouseY={smoothMouseY}
            speedMultiplier={motionSpeedMultiplier}
            interactivePhysics={interactivePhysics}
          />
        );
      })}
    </div>
  );
};

interface ItemProps {
  item: typeof FLOATING_INGREDIENTS[0];
  index: number;
  smoothProgress: any;
  smoothMouseX: any;
  smoothMouseY: any;
  speedMultiplier: number;
  interactivePhysics: boolean;
}

const FloatingFoodItem: React.FC<ItemProps> = ({
  item,
  index,
  smoothProgress,
  smoothMouseX,
  smoothMouseY,
  speedMultiplier,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate dynamic travel distances based on speed multiplier
  const totalTravelY = 1600 * item.speed * speedMultiplier;
  const totalTravelX = (index % 2 === 0 ? 80 : -80) * item.speed * speedMultiplier;
  const rotationDegrees = item.rotationSpeed * speedMultiplier;

  // Transforms driven by page scroll
  const y = useTransform(smoothProgress, [0, 1], [-60, totalTravelY]);
  const x = useTransform(smoothProgress, [0, 1], [0, totalTravelX]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, rotationDegrees]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.15, 0.9]);
  const opacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.92, 1],
    [0.75, 1, 0.9, 0.4]
  );

  // Mouse offset transforms for realistic 3D parallax depth
  const mouseOffsetX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-25 * (index + 1) * 0.4, 25 * (index + 1) * 0.4]
  );
  const mouseOffsetY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-25 * (index + 1) * 0.4, 25 * (index + 1) * 0.4]
  );

  return (
    <motion.div
      style={{
        left: `${item.initialX}%`,
        top: `${item.initialY}%`,
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: item.zIndex,
      }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.4}
      whileHover={{ scale: 1.2, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{
          x: mouseOffsetX,
          y: mouseOffsetY,
        }}
        className="relative group flex flex-col items-center"
      >
        {/* Glow halo */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-70 bg-amber-500/40' : 'opacity-20 bg-amber-500/20'
          }`}
          style={{ transform: 'scale(1.2)' }}
        />

        {/* Circular food ingredient cut-out with fine dining glass border */}
        <div
          className="relative rounded-full p-1.5 overflow-hidden transition-transform duration-300 shadow-2xl backdrop-blur-md"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            background: 'radial-gradient(circle, rgba(28, 32, 42, 0.85) 0%, rgba(11, 13, 17, 0.95) 100%)',
            border: isHovered
              ? '1px solid rgba(245, 158, 11, 0.7)'
              : '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.15)',
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-full pointer-events-none select-none transition-transform duration-500 group-hover:scale-115 filter contrast-110 saturate-110"
            loading="lazy"
          />

          {/* Glint reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full" />
        </div>

        {/* Quiet botanical tooltip that reveals on hover */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          className="mt-2.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[#12141a]/90 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap"
        >
          {item.name}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
