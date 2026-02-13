import React from 'react';

/**
 * Componente: AboutDroneDT
 * Presentación corporativa con la identidad visual de Software DT.
 */
export const AboutDroneDT = () => {
  return (
    <section className="w-full bg-[#DCDCDC] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado con Estilo de Alto Impacto */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-4 border-[#000000] pb-6">
          <h2 className="text-6xl md:text-8xl font-black text-[#000000] leading-none uppercase tracking-tighter">
            DRONE <span className="text-[#FFD700]">DT</span>
          </h2>
          <p className="text-[#FEB60D] font-mono font-bold text-xl md:text-2xl mt-4 md:mt-0">
            // LÍDERES EN COLOMBIA #1
          </p>
        </div>

        {/* Grid de Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-[#000000] uppercase italic">
              Ingeniería de clase mundial aplicada al cielo.
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              Drone DT no es solo una empresa de servicios aéreos; es un ecosistema tecnológico 
              diseñado por <span className="font-bold border-b-2 border-[#FFD700]">NietoDeveloper</span> 
              para llevar la industria colombiana al siguiente nivel. 
            </p>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos arquitectura **MERN**, despliegue en **AWS** y contenedores **Docker** para garantizar que cada operación, desde la fumigación agrícola hasta la 
              inspección industrial, sea monitoreada con precisión milimétrica.
            </p>
            
            {/* Stats Rápidos */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white p-4 border-l-4 border-[#FFD700] shadow-sm">
                <p className="text-2xl font-black text-[#000000]">100%</p>
                <p className="text-xs font-bold text-gray-500 uppercase">Disponibilidad Cloud</p>
              </div>
              <div className="bg-white p-4 border-l-4 border-[#FEB60D] shadow-sm">
                <p className="text-2xl font-black text-[#000000]">+500</p>
                <p className="text-xs font-bold text-gray-500 uppercase">Horas de Vuelo</p>
              </div>
            </div>
          </div>

          {/* Bloque de Identidad Técnica */}
          <div className="relative">
            <div className="bg-[#000000] p-10 text-white rounded-none transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <h4 className="text-[#FFD700] font-black text-2xl mb-4">NUESTRO STACK</h4>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#FEB60D]">{'>'}</span> Next.js 15 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FEB60D]">{'>'}</span> TypeScript / Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FEB60D]">{'>'}</span> Node.js & MongoDB
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FEB60D]">{'>'}</span> CI/CD with Vercel & GitHub
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                  Designed for scalability and high performance production.
                </p>
              </div>
            </div>
            {/* Elemento Decorativo */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FFD700] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};