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