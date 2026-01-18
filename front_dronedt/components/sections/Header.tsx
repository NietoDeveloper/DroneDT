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
        
        {/* LOGO - BOTÓN MAESTRO DE RECARGA ESTILO TESLA */}
        <button 
          onClick={() => window.location.href = '/'}
          className="group flex items-center z-[110] outline-none border-none bg-transparent cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-1"
        >
          <span className="text-3xl font-black tracking-tighter transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            <span 
              className="transition-colors duration-500" 
              style={{ color: blueRey }}
              onMouseOver={(e) => (e.currentTarget.style.color = gold)}
              onMouseOut={(e) => (e.currentTarget.style.color = blueRey)}
            >
              Drone
