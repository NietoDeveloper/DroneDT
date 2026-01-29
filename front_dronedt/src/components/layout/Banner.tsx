"use client";

const Banner = () => {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Video Background - Ocupa todo el contenedor de la sección 1 (80vh) */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Usando tu nuevo nombre de archivo */}
          <source src="/videos/Banner-1.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Tesla: Degradado sutil para dar profundidad al video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* Content Overlay: 
          Quitamos los H1/P grandes de aquí porque ya los pusiste en page.tsx. 
          Dejamos solo un tag minimalista si deseas, o lo dejamos limpio. 
      */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-2">
          <span className="text-white/60 text-[10px] tracking-[0.8em] uppercase font-black animate-pulse">
            Sistemas Autónomos
          </span>
        </div>
      </div>

      {/* El indicador de scroll ya lo tienes en page.tsx, 
          así que aquí el banner queda limpio y optimizado. */}
    </section>
  );
};

export default Banner;