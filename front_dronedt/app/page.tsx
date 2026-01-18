"use client";

import { FC } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Componentes secciones
import DroneModels from '@/components/sections/DroneModels'; 
import Features from '@/components/sections/Features'; 
import Testimonials from '@/components/sections/Testimonials';

const Home: FC = () => {
  const blueRey = "#0041C2";
  const gold = "#FFD700";

  // Clase reutilizable para el botón Brutalista
  const brutalistBtn = `
    group relative inline-block px-14 py-5 
    bg-[#FFD700] text-black font-black uppercase text-xs tracking-[0.3em] 
    transition-transform duration-300 hover:-translate-y-1 active:translate-y-0
    overflow-hidden rounded-none
  `;

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-white">
      
      {/* 1. SECCIÓN PRINCIPAL: VIDEO IMPACTO DIRECTO */}
      <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        >
          <source src="/videos/drone-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 px-4">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-4 animate-tighten">
            <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
          </h1>
          <p className="text-white text-lg md:text-2xl font-light tracking-[0.4em] uppercase mb-12 opacity-90">
            Ingeniería Colombiana de Clase Mundial
          </p>
          
          <Link href="/shop/drones" className={brutalistBtn}>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Compra Ya
            </span>
            {/* Efecto Slide Blue Rey */}
            <div 
              className="absolute inset-0 w-0 bg-[var(--blue-rey)] transition-all duration-300 ease-out group-hover:w-full"
              style={{ backgroundColor: blueRey } as any}
            />
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white opacity-70">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. SECCIÓN REEL DE VIDEOS */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span> en Acción
          </h2>
          <div className="w-32 h-2 mx-auto mt-6" style={{ backgroundColor: gold }}></div>
        </div>


      </section>



export default Home;