import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedFoldTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
}

export default function AnimatedFoldText({ 
  text, 
  className = "", 
  fontSize,
  fontWeight,
  color
}: AnimatedFoldTextProps) {
  const words = text.split(" ");
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.03 }
        }
      }}
      initial="hidden"
      animate="visible"
      className={className}
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontWeight: fontWeight,
        color: color,
        // Match the default CSS from the old FoldText if it had explicit fonts
        fontFamily: 'inherit',
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, rotateX: -90, y: 10 },
            visible: { 
              opacity: 1, 
              rotateX: 0, 
              y: 0, 
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
            }
          }}
          className="inline-block origin-bottom mr-[0.25em]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
