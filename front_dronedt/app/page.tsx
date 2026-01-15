"use client";

import { FC } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Componentes secciones (Eliminamos Hero)
import DroneModels from '@/components/sections/DroneModels'; 
import Features from '@/components/sections/Features'; 
import Testimonials from '@/components/sections/Testimonials';

const Home: FC = () => {
  const blueRey = "#0041C2";
  const gold = "#FFD700";

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-white">
      
      {/* 1. SECCIÓN PRINCIPAL: VIDEO IMPACTO DIRECTO */}
      <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center text-center">
        {/* Video de Fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        >
          <source src="/videos/drone-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Contenido Hero Integrado */}
        <div className="relative z-20 px-4">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-4">
            <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
          </h1>
          <p className="text-white text-lg md:text-2xl font-light tracking-[0.3em] uppercase mb-10 opacity-90">
            Ingeniería Colombiana de Clase Mundial
          </p>
          
          <Link 
            href="/shop/drones" 
            className="px-14 py-4 bg-white text-black font-bold rounded-sm uppercase text-xs tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{ borderBottom: `4px solid ${gold}` }}
          >
            Compra Ya
          </Link>
        </div>

        {/* Indicador de scroll animado */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white opacity-70">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. NUEVA SECCIÓN: REEL DE VIDEOS (Nivel Software DT) */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-[1400px] mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span> en Acción
          </h2>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: gold }}></div>
        </div>

        {/* Grid de Reels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative aspect-[9/16] bg-neutral-900 rounded-lg overflow-hidden group border border-white/10">
              <video
                loop
                muted
                playsInline
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => e.currentTarget.pause()}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <source src={`/videos/reel-${item}.mp4`} type="video/mp4" />
              </video>
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-bold text-xs tracking-widest uppercase">Misión 00{item}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. DRONE MODELS: Grid de productos */}
      <section className="py-24 bg-white">
        <DroneModels 
          title={
            <h2 className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">
              Línea <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
            </h2>
          }
          drones={[
            { 
              id: 1, 
              name: 'Drone X-Alpha', 
              description: 'IA integrada por Software DT.', 
              price: 1500000, 
              image: '/images/drone-x1.jpg' 
            },
            { 
              id: 2, 
              name: 'Drone Pro Max', 
              description: 'GPS de grado militar.', 
              price: 2500000, 
              image: '/images/drone-pro.jpg' 
            },
          ]}
        />
      </section>

      {/* 4. FEATURES & TESTIMONIALS (Manteniendo el flujo original) */}
      <div className="bg-gainsboro/20 py-20">
        <Features 
          title="Ingeniería de Vanguardia"
          features={[
            { icon: <ArrowRight style={{ color: blueRey }} />, title: 'Software DT Core', desc: 'Precisión absoluta.' },
            { icon: <ArrowRight style={{ color: gold }} />, title: 'Soporte 24/7', desc: 'Directo en Bogotá.' },
          ]}
        />
      </div>

      <Testimonials 
        title="Ingeniería DT"
        testimonials={[{ name: 'Carlos Rodríguez', text: 'Rendimiento superior.', rating: 5 }]}
      />

      {/* FINAL CTA */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="relative z-20 text-center">
          <h2 className="text-6xl font-black tracking-tighter uppercase mb-8">
            <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
          </h2>
          <Link 
            href="/shop/drones" 
            className="px-12 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#FFD700] transition-colors"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="bg-white py-6 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">
          Software DT | NietoDeveloper
        </p>
      </div>
    </div>
  );
};

export default Home;