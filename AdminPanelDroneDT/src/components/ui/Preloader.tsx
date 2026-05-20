"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * L5_PRELOADER_ENGINE - Drone DT
 * Calibración de sistemas y Handshake de telemetría.
 */
export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sincronización para el despliegue del MVP
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3500);
    
    // Bloqueo de seguridad del viewport
    document.body.style.overflow = "hidden";
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="drone-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)" 
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
          {/* 1. LAYER: Micro-Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)', 
              backgroundSize: '30px 30px' 
            }} 
          />

          {/* Contenedor del Drone DT - Vuelo Estacionario */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
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
                className="absolute w-32 h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Motores de Alta Revolución */}
                <div className="absolute -right-1 -top-4 w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
                      className="w-12 h-12 border-t-2 border-b-[1px] border-[#FFD700]/40 rounded-full blur-[0.5px]"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-zinc-700 rounded-full border border-zinc-600" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Telemetría DRONE DT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 text-center space-y-6 relative z-20"
          >
            <div>
                <h2 className="text-[#FFD700] font-black tracking-[0.7em] text-3xl italic">
                  DRONE <span className="text-white">DT</span>
                </h2>
                <p className="text-[9px] text-zinc-500 tracking-[0.5em] uppercase mt-2 font-mono">
                  Autonomous Intelligence Engine
                </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 text-[10px] text-zinc-300 font-mono tracking-widest bg-zinc-900/80 px-5 py-2.5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                    SISTEMAS: ONLINE | CALIBRANDO...
                </div>
                <p className="text-[8px] text-zinc-600 font-mono tracking-[0.2em]">BOG_NODE_CLUSTER_CONNECTED</p>
            </div>
          </motion.div>

          {/* Barra de Carga de Alta Precisión */}
          <div className="absolute bottom-20 w-72 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
              className="w-full h-full bg-[#FFD700] shadow-[0_0_20px_#FFD700]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};