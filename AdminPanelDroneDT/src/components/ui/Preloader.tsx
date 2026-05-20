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
    // Bloqueo de seguridad del viewport al montar
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3500);
    
    return () => {
      // Limpieza garantizada al desmontar
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="drone-preloader-engine"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
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
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative w-48 h-48 flex items-center justify-center"
          >
            {/* Cuerpo del Drone (Gold Engineering) */}
            <div className="absolute w-16 h-16 bg-[#FFD700] rounded-2xl shadow-[0_0_60px_rgba(255,215,0,0.25)] z-10 flex items-center justify-center border-t border-white/30">
               <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center border border-white/10">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_12px_red]" />
               </div>
            </div>

            {/* Estructura de Motores en X */}
            {[45, 135, 225, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute w-32 h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="absolute -right-1 -top-4 w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.08, ease: "linear" }}
                      className="w-14 h-14 border-t border-[#FFD700]/30 rounded-full blur-[1px]"
                    />
                    <div className="absolute w-2 h-2 bg-zinc-700 rounded-full border border-zinc-500" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Telemetría DRONE DT */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-24 text-center space-y-6 relative z-20"
          >
            <div className="space-y-1">
                <h2 className="text-[#FFD700] font-black tracking-[0.8em] text-3xl italic ml-[0.8em]">
                  DRONE <span className="text-white">DT</span>
                </h2>
                <p className="text-[9px] text-zinc-500 tracking-[0.5em] uppercase font-mono">
                  Autonomous Intelligence Engine
                </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 text-[10px] text-zinc-300 font-mono tracking-widest bg-zinc-900/50 px-6 py-3 rounded-xl border border-white/5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    SYSTEM_CALIBRATION: ACTIVE
                </div>
                <p className="text-[7px] text-zinc-600 font-mono tracking-[0.3em] uppercase">
                  Nieto Laboratory / Deployment 2026
                </p>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-20 w-64 h-[1px] bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="w-full h-full bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};