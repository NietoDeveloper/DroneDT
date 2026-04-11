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
          </p>m) => (viewBox="0 0 100 100" className="absolute">
                  <circle cx="50"