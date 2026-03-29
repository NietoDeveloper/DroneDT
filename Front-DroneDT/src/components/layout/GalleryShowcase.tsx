// src/components/layout/GalleryShowcase.tsx
import React from 'react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: string;
  span?: string; // Para controlar el layout del grid
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    type: 'video',
    url: '/videos/drone-flight-industrial.mp4',
    title: 'Inspección de Torres',
    category: 'Industrial',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'g2',
    type: 'image',
    url: '/images/gallery/agriculture-drone.jpg',
    title: 'Fumigación de Precisión',
    category: 'Agro',
    span: 'md:col-span-1'
  },
  {
    id: 'g3',
    type: 'image',
    url: '/images/gallery/cinema-drone.jpg',
    title: 'Captura 8K Cine',
    category: 'Media',
    span: 'md:col-span-1'
  },
  {
    id: 'g4',
    type: 'image',
    url: '/images/gallery/night-vision.jpg',
    title: 'Vigilancia Térmica',
    category: 'Security',
    span: 'md:col-span-2'
  }
];

export const GalleryShowcase = () => {
  return (
    <section className="bg-[#DCDCDC] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la Galería */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-[#000000] uppercase tracking-tighter">
            DRONE <span className="text-[#FFD700]">IN ACTION</span>
          </h2>
          <div className="w-24 h-2 bg-[#FEB60D] mt-2"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {GALLERY_DATA.map((item) => (
            <div 
              key={item.id} 
              className={`relative group overflow-hidden bg-black border-2 border-transparent hover:border-[#FFD700] transition-all duration-500 ${item.span}`}
            >
              {item.type === 'video' ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
              )}

              {/* Overlay con Información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#FFD700] text-[10px] font-black tracking-widest uppercase mb-1">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
              
              {/* Badge de "LIVE" para Videos */}
              {item.type === 'video' && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  REC
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer de Galería con estilo Software DT */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-4 text-[#000000] font-black uppercase tracking-widest group">
            <span className="group-hover:text-[#FEB60D] transition-colors">Ver portafolio completo</span>
            <div className="w-12 h-12 rounded-full border-2 border-[#000000] flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
              →
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};