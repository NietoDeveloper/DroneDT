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
            className="relative w-48 h-48 flex items-center justify-center"
          >
            {/* Cuerpo del Drone (Identidad Técnica Gold) */}
            <div className="absolute w-16 h-16 bg-[#FFD700] rounded-2xl shadow-[0_0_60px_rgba(255,215,0,0.3)] z-10 flex items-center justify-center border-t border-white/40">
               <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  {/* Sensor de Proximidad Activo */}
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_12px_red]" />
               </div>
            </div>

            {/* Configuración de Motores en X (Atlas-MERN Structure) */}
            {[45, 135, 225, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute w-32 h-2 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Motores de Alta Revolución */}x items-center enter">
                    <motion.div
 
                    /
                </div>
              </div>
            ))}




      )}
    </AnimatePresence>
  );
}