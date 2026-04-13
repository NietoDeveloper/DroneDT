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
    span: 'md:col-span-
export default GalleryShowcase;