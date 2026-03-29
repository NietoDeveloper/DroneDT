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
      {/* Icono de Drone DT - Ingeniería de Precisión */}
      <div className="relative flex items-center justify-center">
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 z-10"
        >
          {/* Hélices y Chasis */}
          <path d="M12 10V4" />
          <path d="m17 2 3 3" />
          <path d="m7 2-3 3" />
          <path d="M2 10h20" />
          <path d="m22 10-3 3" />
          <path d="m2 10 3 3" />
          <path d="M12 10v12" />
          <path d="m17 22 3-3" />
          <path d="m7 22-3-3" />
          {/* Núcleo Central - Cambiado de azul a un punto de poder blanco/dorado */}
          <circle cx="12" cy="10" r="2" fill="#FFD700" className="group-hover:fill-white transition-colors" />
        </svg>
        
        {/* Glow de Motor Autónomo */}
        <div className="absolute inset-0 bg-[#FFD700]/20 blur-md rounded-full group-hover:bg-[#FFD700]/40 transition-all scale-150" />
      </div>

      {/* Texto de la Marca - Drone DT Elite Style */}
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white italic">DRONE</span>
          <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-0.5 text-[#FFD700]">DT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-[1px] w-3 bg-[#FFD700]/40"></span>
          <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/50 group-hover:text-[#FFD700] transition-colors">
            Colombia
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;