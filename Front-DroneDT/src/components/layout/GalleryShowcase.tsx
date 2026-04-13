"use client";

import React, { useState, useEffect, useCallback } from 'react';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * COMPONENT: GalleryShowcase v2.0 - Production Ready
 * UPDATE: Conexión final de activos optimizados (H.265) desde /public/videos/
 * RESPONSIVE: 310px - 1900px
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
    url: '/videos/industrial-inspection.mp4', 
    title: 'Inspección de Torres',
    category: 'Industrial',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'g2',
    type: 'video',
    url: '/videos/agro-precision.mp4', 
    title: 'Fumigación de Precisión',
    category: 'Agro',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g3',
    type: 'video',
    url: '/videos/cinema-8k.mp4', 
    title: 'Captura 8K Cine',
    category: 'Media',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g4',
    type: 'video',
    url: '/videos/security-thermal.mp4', 
    title: 'Vigilancia Proyectos',
    category: 'Security',
    span: 'md:col-span-2 md:row-span-1'
  }
];

export const GalleryShowcase: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryData = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/gallery');
      if (!response.ok) throw new Error('Uplink Gallery Offline');
      const data = await response.json();
      setGallery(data.success ? data.data : FALLBACK_DATA);
    } catch (error) {
      // Si falla el API, cargamos los videos locales optimizados de Nieto Laboratory
      setGallery(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  return (
    <section className="bg-[#DCDCDC] py-12 md:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1900px] mx-auto">
        
        {/* HEADER - SpaceX Style Aesthetics */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#FEB60D] font-black tracking-[0.3em] text-[10px] md:text-xs uppercase">
              Visual Intelligence
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#000000] uppercase tracking-tighter leading-none">
              DRONE <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: '1px black' } as React.CSSProperties}
              >
                IN ACTION
              </span>
            </h2>
               <span className="text-xl md:text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;