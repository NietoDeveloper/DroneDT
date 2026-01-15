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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative aspect-[9/16] bg-neutral-900 overflow-hidden group border-2 border-white/5 hover:border-[#FFD700]/50 transition-colors duration-500">
              <video
                loop
                muted
                playsInline
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => e.currentTarget.pause()}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              >
                <source src={`/videos/reel-${item}.mp4`} type="video/mp4" />
              </video>
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-[#FFD700] font-black text-sm tracking-[0.3em] uppercase">Misión 00{item}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. DRONE MODELS */}
      <section className="py-24 bg-white">
        <DroneModels 
          title={
            <h2 className="text-center text-5xl md:text-7xl font-black uppercase tracking-tighter mb-20">
              Línea <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
            </h2>
          }
          drones={[
            { id: 1, name: 'Drone X-Alpha', description: 'IA Software DT.', price: 1500000, image: '/images/drone-x1.jpg' },
            { id: 2, name: 'Drone Pro Max', description: 'GPS Militar.', price: 2500000, image: '/images/drone-pro.jpg' },
          ]}
        />
      </section>

      {/* 4. FEATURES & TESTIMONIALS */}
      <div className="bg-gainsboro py-24 border-y border-black/5">
        <Features 
          title={
            <span className="uppercase tracking-tighter font-black text-4xl">
               Ingeniería <span style={{ color: blueRey }}>Drone</span> <span style={{ color: gold }}>DT</span>
            </span>
          }
          features={[
            { icon: <ArrowRight size={20} />, title: 'Software DT Core', desc: 'Sistemas optimizados.' },
            { icon: <ArrowRight size={20} />, title: 'Soporte 24/7', desc: 'Operación nacional.' },
          ]}
        />
      </div>

      {/* 5. FINAL CALL TO ACTION BRUTALISTA */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="relative z-20 text-center px-6">
          <h2 className="text-7xl md:text-9xl font-black tracking-[0.05em] uppercase mb-12">
            <span style={{ color: blueRey }}>Drone</span> <span className="text-white">DT</span>
          </h2>
          
          <Link href="/shop/drones" className={brutalistBtn}>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Comprar Ahora
            </span>
            <div 
              className="absolute inset-0 w-0 bg-[var(--blue-rey)] transition-all duration-300 ease-out group-hover:w-full"
              style={{ backgroundColor: blueRey } as any}
            />
          </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="bg-white py-10 text-center border-t-4 border-black">
        <p className="text-[12px] font-black uppercase tracking-[0.8em] text-black">
          Engineered by Software DT | NietoDeveloper
        </p>
      </div>

      <style jsx global>{`
        @keyframes tighten {
          from { letter-spacing: 0.1em; opacity: 0; }
          to { letter-spacing: -0.05em; opacity: 1; }
        }
        .animate-tighten {
          animation: tighten 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;