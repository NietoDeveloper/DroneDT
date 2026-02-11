"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  { id: 1, type: 'video', src: '/Banner-1.mp4', title: 'DRONE DT', subtitle: 'Drone Colombiano • Bogotá' },
  { id: 2, type: 'image', src: '/Banner-1.png', title: 'Modelo: Mid_B2-Pro8', subtitle: 'Fotografía y Vuelo Profesional' },
  { id: 3, type: 'image', src: '/Banner-2.png', title: 'Modelo: Mini_A2-Pro5', subtitle: 'Vuelo Sigiloso y Ágil' },
];



