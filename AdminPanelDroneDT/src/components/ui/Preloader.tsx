"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sincronización perfecta para el MVP del 30 de marzo
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3500); //
    
    // Bloqueamos scroll durante la calibración de sistemas
    document.body.style.overflow = "hidden"; //
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; //
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ 
            opacity: 0, 
            scale: 1.1, // Suavizamos el scale para un efecto más premium
            filter: "blur(20px)" 
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }} //
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black" //
        >
          {/* Contenedor del Drone DT - Vuelo Estacionario */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} //


