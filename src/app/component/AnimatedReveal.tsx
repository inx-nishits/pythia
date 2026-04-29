"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedRevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export default function AnimatedReveal({ children, index = 0, className = "" }: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
