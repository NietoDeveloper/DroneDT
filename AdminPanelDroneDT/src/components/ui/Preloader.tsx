"use client";
    
    return () =>{
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ 
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13,
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease:center"
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
                {/* Motores de Alta Revolución */}
                <div className="absolute -right-1 -top-4 w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }} // RPMs aumentadas
                      className="w-12 h-12 border-t-2 border-b-[1px] border-[#FFD700]/50 rounded-full blur-[0.8px]"
                    />
                    <div className="absolute w-3 h-bg-zinc-700 rounded-full border border-zinc-600" />
                </div>
              </div>
            ))}
          </motion.div>
                </div>
          </motion.div>
            <motion.div 
              initial={{ x: "-1
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}