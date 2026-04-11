"use client";

import React, { useState, useEffect, useCallback } from 'react';

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
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g3',
    type: 'image',
    url: '/images/gallery/cinema-drone.jpg',
    title: 'Captura 8K Cine',
    category: 'Media',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g4',
    type: 'image',
    url: '/images/gallery/night-vision.jpg',
    title: 'Vigilancia Térmica',
    category: 'Security',
    span: 'md:col-span-2 md:row-span-1'
  }
];

// Cambiamos a exportación nombrada para que coincida exactamente con el import dinámico
export const GalleryShowcase: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryData = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/gallery');
      if (!response.ok) throw new Error('Uplink Gallery Failed');
      
      const data = await response.json();
      setGallery(data.success ? data.data : FALLBACK_DATA);
    } catch (error) {
      console.warn('⚠️ Gallery Uplink Retrying / Using Fallback:', error);
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
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#FEB60D] font-black tracking-[0.3em] text-xs uppercase">
              Visual Intelligence
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#000000] uppercase tracking-tighter leading-none">
              DRONE <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: '1px black' } as React.CSSProperties}
              >
                IN ACTION
              </span>
            </h2>
            <div className="w-40 h-1.5 bg-[#000000]"></div>
          </div>
          <p className="max-w-md text-[#333] font-medium text-sm md:text-right leading-relaxed uppercase italic">
            Tecnología de vanguardia aplicada a los sectores más exigentes de Colombia.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px] transition-opacity duration-1000 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {gallery.map((item) => (
            <div 
              key={item.id} mate-pulse"></span>
                  4K Stream
                </div>tems-center gap-4">
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

// Mantenemos también el default export por si acaso, pero el import dinámico prefiere el nombrado en esta config
export default GalleryShowcase;