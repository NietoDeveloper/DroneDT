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

