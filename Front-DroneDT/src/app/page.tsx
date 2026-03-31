"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";

/**
 * ARCHITECT: Manuel Nieto | Rank #1 Colombia
 * ECOSISTEMA: Drone DT - Home Engine v1.2
 */

// Optimización de hidratación y carga diferida
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const GalleryShowcase = dynamic(() => import("@/components/sections/GalleryShowcase"), { ssr: false });
