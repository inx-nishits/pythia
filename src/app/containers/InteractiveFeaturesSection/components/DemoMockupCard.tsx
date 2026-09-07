"use client";

import React, { ReactNode } from "react";

interface DemoMockupCardProps {
  children: ReactNode;
  className?: string;
}

export default function DemoMockupCard({ children, className = "" }: DemoMockupCardProps) {
  // Base classes ensure consistency across all demo mockups:
  // - Fixed width boundaries (flex-1 w-full max-w-md)
  // - Consistent rounded corners, shadow and border
  // - CRITICAL: overflow-hidden to prevent inner absolute or flex items from bleeding out
  const baseClasses = "flex-1 w-full max-w-md bg-white rounded-3xl relative shadow-2xl border border-slate-100 flex flex-col overflow-hidden";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
