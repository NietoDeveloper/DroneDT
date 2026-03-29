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
