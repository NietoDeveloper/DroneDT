"use client";

import React from 'react';
import { Shield, Zap, Globe, Target } from 'lucide-react'; // Asumiendo que usas lucide-react, si no, usa SVGs.

/**
 * ARCHITECT: Manuel Nieto | Rank #1 Colombia
 * COMPONENT: AboutDT (Corporate Vision Section)
 * STYLE: Minimalist Industrial / SpaceX Inspired
 */

const AboutDT: React.FC = () => {
  const stats = [
    { label: "Proyectos Activos", value: "50+", suffix: "2026" },
    { label: "Cobertura Nacional", value: "100%", suffix: "Colombia" },
    { label: "Latencia de Control", value: "<20", suffix: "ms" },
    { label: "Seguridad", value: "Dual", suffix: "Cluster" },
  ];

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1900px] mx-auto px-6 md:px-12">
        
        {/* GRID PRINCIPAL: Visión y Legado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <span className="text-[#FFD700] bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em]">
                Beyond Boundaries
              </span>
              <h2 className="mt-6 text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                INGENIERÍA <br /> 
                <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>SIN LÍMITES</span>
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-black/70 font-medium leading-relaxed max-w-xl">
              Drone DT no es solo una empresa de tecnología; es el epicentro de la automatización aérea en Colombia. 
              Nacidos en el <span className="text-black font-bold">Nieto Laboratory</span>, fusionamos software de alta disponibilidad 
              con hardware de grado industrial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <div className="flex gap-4">
                <Target className="w-6 h-6 text-[#FFD700]" />
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest">Misión Crítica</h4>
                  <p className="text-sm text-black/60 mt-1">Soluciones de drones diseñadas para fallar-seguro en entornos hostiles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Globe className="w-6 h-6 text-[#FFD700]" />
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest">Impacto Global</h4>
                  <p className="text-sm text-black/60 mt-1">Arquitectura escalable desde Bogotá para los estándares más exigentes del mundo.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ELEMENTO VISUAL: Abstracto/Tecnológico */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#FFD700]/10 rounded-full blur-3xl group-hover:bg-[#FFD700]/20 transition-all duration-700" />
            <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Aquí iría una imagen de alta resolución de un drone o el logo en 3D */}
              <div className="text-center p-12">
                <h3 className="text-[#FFD700] text-9xl font-black italic opacity-20 select-none">DT</h3>
                <div className="mt-[-40px] text-white space-y-4">
                  <p className="text-[10px] tracking-[0.8em] uppercase font-light">Precision System</p>
                  <p className="text-4xl font-black uppercase tracking-tighter">Nieto Laboratory</p>
                </div>
              </div>
              
              {/* Decoración Industrial */}
              <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/10 pointer-events-none" />
              <div className="absolute bottom-6 right-6 text-white/30 font-mono text-[10px]">
                BUILD_VER: 2026.03.S+
              </div>
            </div>
          </div>
        </div>

        {/* MÉTRICAS DE PODER (FOOTER DE LA SECCIÓN) */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-black/10 pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="group cursor-default">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-7xl font-black tracking-tighter transition-colors group-hover:text-[#FFD700]">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] mt-2 text-black/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutDT;