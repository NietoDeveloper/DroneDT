"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3.5 segundos: tiempo perfecto para sincronizar con el scroll-lock
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3500);
    
    // Bloqueamos scroll mientras carga
    document.body.style.overflow = "hidden";
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ 
            opacity: 0, 
            scale: 1.2,
            filter: "blur(20px)" 
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
          {/* Contenedor del Drone - Animación de flotación suave */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative w-40 h-40 flex items-center justify-center"
          >
            {/* Cuerpo del Drone (Diseño Industrial DT) */}
            <div className="absolute w-14 h-14 bg-[#FFD700] rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.4)] z-10 flex items-center justify-center border-t border-white/30">
               <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
               </div>
            </div>

            {/* Brazos y Hélices en formación X */}
            {[45, 135, 225, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute w-28 h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Motor y Hélice */}
                <div className="absolute -right-2 -top-3.5 w-8 h-8 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.12, ease: "linear" }}
                      className="w-10 h-10 border-t-2 border-b-[1px] border-[#FFD700]/60 rounded-full blur-[0.5px]"
                    />
                    <div className="absolute w-2 h-2 bg-zinc-700 rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Telemetría y Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center space-y-4"
          >
            <div>
                <h2 className="text-[#FFD700] font-black tracking-[0.6em] text-2xl">DRONE DT</h2>
                <p className="text-[8px] text-zinc-500 tracking-[0.4em] uppercase mt-1">Advanced Autonomous Systems</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-mono tracking-widest bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                    CALIBRANDO GIROSCOPIOS...
                </div>
            </div>
          </motion.div>

          {/* Barra de Progreso Minimalista */}
          <div className="absolute bottom-16 w-64 h-[2px] bg-zinc-900 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.2, ease: "linear" }}
              className="w-full h-full bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}