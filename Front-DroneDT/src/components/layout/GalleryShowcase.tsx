"use client";

import React, { useState, useEffect, useCallback } from 'react';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * COMPONENT: GalleryShowcase v1.5 - Remote Assets Ready
 * UPDATE: Conexión de videos online y placeholders de alta resolución
 */

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: string;
  span?: string; 
}

const FALLBACK_DATA: GalleryItem[] = [
  {
    id: 'g1',
    type: 'video',
    // Video: Drone industrial inspeccionando estructuras
    url: 'https://motionarray.com/stock-video/drone-ascends-above-winding-river-in-el-penon-de-guatape-colombia-at-midday-2603066/', 
    title: 'Inspección de Torres',
    category: 'Industrial',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'g2',
    type: 'image',
    // Image: Drone sobre campos agrícolas (Agro)
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1600&auto=format&fit=crop',
    title: 'Fumigación de Precisión',
    category: 'Agro',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g3',
    type: 'image',
    // Image: Drone profesional de cine (Media)
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
    title: 'Captura 8K Cine',
    category: 'Media',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g4',
    type: 'image',
    // Image: Drone en entorno oscuro/seguridad (Security)
    url: 'https://images.unsplash.com/photo-1527142879024-c6c91aa64200?q=80&w=1600&auto=format&fit=crop',
    title: 'Vigilancia Térmica',
    category: 'Security',
    span: 'md:col-span-2 md:row-span-1'
  }
];

export const GalleryShowcase: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryData = useCallback(async () => {
    try {
      // Intento de conexión al backend local/remoto
      const response = await fetch('/api/v1/gallery');
      if (!response.ok) throw new Error('Uplink Gallery Offline');
      
      const data = await response.json();
      setGallery(data.success ? data.data : FALLBACK_DATA);
    } catch (error) {
      // Silenciamos el error para no ensuciar la consola de desarrollo constantemente
      setGallery(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  return (
    <section className="bg-[#DCDCDC] py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1900px] mx-auto">
        
        {/* HEADER DE SECCIÓN */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#FEB60D] font-black tracking-[0.3em] text-xs uppercase">
              Visual Intelligence
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#000000] uppercase tracking-tighter leading-none">
              DRONE <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: '1px black' } as React.CSSProperties}
              >xigentes de Colombia.
          </p>
        </div>

        {/* GRID DE GALERÍA */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px] transition-opacity duration-1000 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {gallery.map((it
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  >
                    {/* Al usar fuentes externas, es vital el atributo key para forzar recarga si cambia */}
                    <source key={item.url} src={item.url} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Asset+Offline';
                    }}
                  />
                )}
              </div>

              {/* OVERLAY DE GRADIENTE */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10" />

              {/* INFO DEL ITEM */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-[#FFD700] text-black text-[9px] font-black tracking-widest uppercase px-3 py-1 mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-none mb-2">
                    {item.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-[1px] bg-white/50 transition-all duration-700" />
                </div>
              </div>
              
              {item.type === 'video' && (
                <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-3 py-1.5 tracking-tighter uppercase rounded-full">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  4K Stream
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER DE SECCIÓN */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#000000] border-2 border-[#DCDCDC] flex items-center justify-center text-[10px] text-white font-bold">
                  DT
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/60">
              +50 Proyectos ejecutados en 2026
            </p>
          </div>

          <button className="relative flex items-center gap-6 text-[#000000] font-black uppercase tracking-[.25em] group text-sm">
            <span className="relative z-10 group-hover:text-[#FEB60D] transition-colors duration-300">
              Explorar Flota Completa
            </span>
            <div className="relative w-14 h-14 flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
               <svg width="40" height="40" viewBox="0 0 100 100" className="absolute">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 10" />
               </svg>
               <span className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;