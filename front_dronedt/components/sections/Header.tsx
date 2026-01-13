"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Definición de colores de identidad DroneDT
  const blueRey = "#0041C2"; 
  const gold = "#FFD700";

  const droneTypes = [
    { name: 'Drones de Carrera', img: '/img/race-drone.png', href: '/shop/drones' },
    { name: 'Fotografía Aérea', img: '/img/photo-drone.png', href: '/shop/photography' },
    { name: 'Drones Profesionales', img: '/img/pro-drone.png', href: '/shop/professional' },
    { name: 'Drones de Inspección', img: '/img/industrial-drone.png', href: '/shop/industrial' },
  ];

  const navLinks = [
    { name: 'Accesorios', href: '/shop/accesorios' },
    { name: 'Servicios', href: '/shop/servicios' },
    { name: 'Demos', href: '/demos' },
    { name: 'About', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        activeCategory || isMenuOpen ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <nav className="max-w-[1900px] mx-auto px-8 h-20 flex items-center justify-between">
        
       


          

       