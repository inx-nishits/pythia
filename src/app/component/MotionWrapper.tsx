"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

// Generic wrapper for any motion element that uses whileInView or animate
// Supports: div, span, h2, h3, article, figure
export function MotionDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}

export function MotionSpan(props: HTMLMotionProps<"span">) {
  return <motion.span {...props} />;
}

export function MotionH2(props: HTMLMotionProps<"h2">) {
  return <motion.h2 {...props} />;
}

export function MotionP(props: HTMLMotionProps<"p">) {
  return <motion.p {...props} />;
}

export function MotionArticle(props: HTMLMotionProps<"article">) {
  return <motion.article {...props} />;
}

export function MotionFigure(props: HTMLMotionProps<"figure">) {
  return <motion.figure {...props} />;
}
