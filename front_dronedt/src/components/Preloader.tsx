"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3.5 segundos para que se aprecie la animación y cargue el ProductShow
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
          {/* Contenedor del Drone */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Cuerpo del Drone (Círculo Central) */}
            <div className="absolute w-12 h-12 bg-[#FFD700] rounded-full shadow-[0_0_30px_#FFD700] z-10 flex items-center justify-center">
               <div className="w-4 h-4 bg-black rounded-full animate-pulse" />
            </div>

            {/* Hélices Animadas (4 brazos) */}
            {[0, 90, 180, 270].map((angle, i) => (
              <div
                key={i}
                className="absolute w-24 h-1 bg-gray-800"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* La hélice en el extremo del brazo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
                  className="absolute -right-4 -top-3 w-8 h-8 border-t-2 border-b-2 border-[#FFD700] rounded-full"
                />
              </div>
            ))}
          </div>

          {/* Texto de Telemetría */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h2 className="text-[#FFD700] font-black tracking-[0.3em] text-xl mb-2">DRONE DT</h2>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                Iniciando Sistemas de Propulsión...
            </div>
          </motion.div>

          {/* Barra de progreso técnica */}
          <div className="absolute bottom-20 w-48 h-[2px] bg-gray-900 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="w-full h-full bg-[#FFD700]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}