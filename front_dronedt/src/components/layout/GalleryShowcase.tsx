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