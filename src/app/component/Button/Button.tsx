import React from "react";

function Button({ 
  className = "", 
  variant = "primary", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed";
  
  return (
    <button
      {...props}
      className={`${baseStyles} ${className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
