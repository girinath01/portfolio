import { motion } from "framer-motion";
import { type ReactNode } from "react";

// Professional easing curve — smooth deceleration (easeOutQuart)
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const directions = {
    up:    { y: 28, x: 0 },
    down:  { y: -28, x: 0 },
    left:  { y: 0, x: 28 },
    right: { y: 0, x: -28 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}
