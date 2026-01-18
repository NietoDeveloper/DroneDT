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

      </section>



export default Home;