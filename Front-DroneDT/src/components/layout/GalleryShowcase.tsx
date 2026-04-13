"use client";

import React, { useState, useEffect, useCallback } from 'react';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * COMPONENT: GalleryShowcase v2.0 - Local Engine Ready
 * UPDATE: Conexión final de activos locales (MP4) desde /public/videos/
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
    url: '/videos/industrial-inspection.mp4', // <--- Ajusta este nombre si es necesario
    title: 'Inspección de Torres',
    category: 'Industrial',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'g2',
    type: 'video',
    url: '/videos/agro-precision.mp4', // <--- Ajusta este nombre si es necesario
    title: 'Fumigación de Precisión',
    category: 'Agro',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g3',
    type: 'video',
    url: '/videos/cinema-8k.mp4', // <--- Ajusta este nombre si es necesario
    title: 'Captura 8K Cine',
    category: 'Media',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'g4',
    type: 'video',
    url: '/videos/security-thermal.mp4', // <--- Ajusta este nombre si es necesario
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
      setGallery(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }RAW FEED
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#000000] border-2 border-[#DCDCDC] flex items-center justify-center text-[10px] text-white font-bold italic">
                  DT
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/60">
              Visual Engine v2.0 | {new Date().getFullYear()}
            </p>
          </div>

          <button className="relative flex items-center gap-6 text-[#000000] font-black uppercase tracking-[.25em] group text-sm">
            <span className="relative z-10 group-hover:text-[#FEB60D] transition-colors duration-300">
              Ver Catálogo Completo
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