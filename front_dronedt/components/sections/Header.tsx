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
            </span>
            <span 
              className="transition-colors duration-500" 
              style={{ color: gold }}
            >
                D T
            </span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          <button 
            onMouseEnter={() => setActiveCategory('drones')}
            className="px-5 py-2 rounded-md font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:text-white"
            style={{ 
                color: activeCategory || isMenuOpen ? '#000' : '#fff'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Drones
          </button>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="px-5 py-2 rounded-md font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:text-white"
              style={{ 
                color: activeCategory || isMenuOpen ? '#000' : '#fff'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/cart" className="p-2 rounded-md transition-colors hover:text-white" 
            style={{ color: activeCategory || isMenuOpen ? '#000' : '#fff' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <ShoppingCart size={22} />
          </Link>
          <Link href="/login" className="p-2 rounded-md transition-colors hover:text-white"
            style={{ color: activeCategory || isMenuOpen ? '#000' : '#fff' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <User size={22} />
          </Link>
          <button className="p-2 rounded-md transition-colors hover:text-white"
            style={{ color: activeCategory || isMenuOpen ? '#000' : '#fff' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <LogOut size={22} />
          </button>
        </div>

        {/* --- AJUSTE MENÚ HAMBURGUESA --- */}
        <button 
          className="lg:hidden p-2 rounded-md transition-all duration-300 group z-[110] cursor-pointer hover:scale-125 hover:-rotate-12 active:scale-90"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={34} style={{ color: blueRey }} className="transition-all group-hover:text-[#FFD700] group-hover:rotate-90" />
          ) : (
            <div className="space-y-1.5 p-1">
              {/* Barras con hover Gold y Movimiento */}
              <div className="w-8 h-1 transition-all duration-300 group-hover:bg-[#FFD700] group-hover:translate-x-1" style={{ backgroundColor: blueRey }}></div>
              <div className="w-8 h-1 transition-all duration-300 group-hover:bg-[#FFD700] group-hover:-translate-x-1" style={{ backgroundColor: blueRey }}></div>
              <div className="w-8 h-1 transition-all duration-300 group-hover:bg-[#FFD700] group-hover:translate-x-1" style={{ backgroundColor: blueRey }}></div>
            </div>
          )}
        </button>
      </nav>

      {/* Mega Menu Drones */}
      <div 
        className={`absolute top-0 left-0 w-full bg-white transition-all duration-500 ease-in-out overflow-hidden z-[90] border-b-4 ${
          activeCategory === 'drones' ? 'max-h-[600px] opacity-100 pt-24' : 'max-h-0 opacity-0'
        }`}
        style={{ borderColor: gold }}
      >
        <div className="max-w-[1500px] mx-auto px-12 pb-12 grid grid-cols-4 gap-8">
          {droneTypes.map((drone) => (
            <Link key={drone.name} href={drone.href} className="group flex flex-col items-center space-y-4">
              <div className="w-full aspect-video bg-main rounded-lg overflow-hidden border border-transparent group-hover:border-[#0041C2] transition-all">
                <img src={drone.img} alt={drone.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-black font-black uppercase text-xs tracking-widest group-hover:text-[#0041C2] transition-colors">{drone.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      <div className={`fixed inset-0 bg-white transition-transform duration-500 lg:hidden z-[100] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-10 pt-28 space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Explorar DroneDT</p>
          {droneTypes.map((drone) => (
            <Link key={drone.name} href={drone.href} className="text-3xl font-black uppercase tracking-tighter transition-colors hover:text-[#0041C2]" onClick={() => setIsMenuOpen(false)}>
              {drone.name}
            </Link>
          ))}

};

export default Header;