// src/components/ui/Buttons.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

/**
 * Sistema de Botones Atómicos - Drone DT
 * Basado en la identidad visual de Software DT.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  
  // Estilos Base
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variantes de Color (Software DT Palette)
  const variants = {
    primary: "bg-[#FFD700] text-[#000000] hover:bg-[#000000] hover:text-[#FFD700] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
    secondary: "bg-[#000000] text-[#FFD700] hover:bg-[#FEB60D] hover:text-[#000000] border border-[#FFD700]",
    danger: "bg-red-600 text-white hover:bg-black border-b-4 border-red-800",
    outline: "bg-transparent border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white",
    ghost: "bg-[#DCDCDC] text-gray-600 hover:text-black hover:bg-white"
  };

  // Tamaños
  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
    xl: "px-12 py-5 text-base md:text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Procesando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Botón especializado para el flujo de Checkout (Wompi/Bancolombia)
 */
export const CheckoutButton: React.FC<ButtonProps> = (props) => (
  <Button 
    variant="primary" 
    className="w-full border-b-8 border-[#FEB60D] !shadow-2xl" 
    {...props}
  />
);