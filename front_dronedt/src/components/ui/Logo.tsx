"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  iconSize?: number;
}

const Logo = ({ className = "", iconSize = 28 }: LogoProps) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 group transition-all ${className} outline-none`}
    >
      {/* Icono de Drone Manual (SVG Puro para evitar errores de Lucide) */}
      <div className="relative flex items-center justify-center">
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 z-10"
        >
          <path d="M12 10V4" />
          <path d="m17 2 3 3" />
          <path d="m7 2-3 3" />
          <path d="M2 10h20" />
          <path d="m22 10-3 3" />
          <path d="m2 10 3 3" />
          <path d="M12 10v12" />
          <path d="m17 22 3-3" />
          <path d="m7 22-3-3" />
          <circle cx="12" cy="10" r="2" fill="#0000FF" stroke="none" />
        </svg>
        
        {/* Resplandor sutil con los colores del branding */}
        <div className="absolute inset-0 bg-[#FFD700]/20 blur-md rounded-full group-hover:bg-[#FFD700]/40 transition-all scale-150" />
      </div>

      {/* Texto de la Marca - Estilo Software DT */}
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0000FF] italic">Drone</span>
          <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-0.5 text-[#FFD700]">DT</span>
        </div>
        <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-black/40 group-hover:text-[#0000FF] transition-colors">Colombia</span>
      </div>
    </Link>
  );
};

export default Logo;