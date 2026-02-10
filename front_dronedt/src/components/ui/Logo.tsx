"use client";

import { Drone } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  iconSize?: number;
}

const Logo = ({ className = "", iconSize = 24 }: LogoProps) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 group transition-all ${className}`}
    >
      {/* El Icono del Drone con el color Gold de Software DT */}
      <div className="relative flex items-center justify-center">
        <Drone 
          size={iconSize} 
          className="text-[#FFD700] group-hover:rotate-12 transition-transform duration-300" 
          strokeWidth={2.5}
        />
        {/* Un pequeño resplandor sutil detrás del drone */}
        <div className="absolute inset-0 bg-[#FFD700]/20 blur-lg rounded-full group-hover:bg-[#FFD700]/40 transition-all" />
      </div>

      {/* Texto de la Marca */}
      <span className="text-xl font-black tracking-tighter text-black uppercase">
        Drone<span className="text-[#FFD700]">DT</span>
      </span>
    </Link>
  );
};

export default Logo;