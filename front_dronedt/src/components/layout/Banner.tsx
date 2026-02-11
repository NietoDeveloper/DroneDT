// ... (mismo código de imports y slides)

const Banner = () => {
  // ... (mismo código de estado y lógica de video)

  return (
    /* AJUSTE: h-[75vh] para permitir ver el componente de abajo */
    <section className="relative w-full h-[75vh] bg-black overflow-hidden font-montserrat">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                ref={index === currentSlide ? videoRef : null}
                autoPlay loop muted playsInline
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide && isVideoVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-out"
                style={{ 
                  backgroundImage: `url(${slide.src})`,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
                }}
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full max-w-[1900px] mx-auto px-4 text-center">
        
        {/* AJUSTE: mt-[12vh] o mt-[100px] para que el título no quede muy arriba en 75vh */}
        <div className="mt-[12vh] md:mt-[100px] flex flex-col items-center w-full">
          <div key={currentSlide} className="animate-in fade-in slide-in-from-top duration-1000 w-full">
            <h1 className="text-4xl md:text-[68px] lg:text-[72px] font-black tracking-tighter uppercase italic leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)]">
              {renderTitle(slides[currentSlide].title)}
            </h1>
            <p className="text-white text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-bold drop-shadow-md mt-4 opacity-90">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>

        {/* AJUSTE: Reducción del margen inferior (mb) para que quepa bien en 75vh */}
        <div className="mb-[10vh] flex flex-col md:flex-row gap-4 w-full max-w-[700px] pointer-events-auto">
          <Link 
            href="/shop"
            className="flex-1 h-[65px] md:h-[74px] flex items-center justify-center bg-[#FFD700] text-black rounded-[4px] text-[16px] md:text-[18px] font-black uppercase tracking-[0.2em] hover:bg-[#0000FF] hover:text-white hover:scale-[1.02] transition-all shadow-2xl active:scale-95"
          >
            Compra Ahora
          </Link>
          <Link 
            href="/services" 
            className="flex-1 h-[65px] md:h-[74px] flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-[4px] text-[16px] md:text-[18px] font-black uppercase tracking-[0.2em] border border-white/20 hover:bg-[#0000FF] hover:text-white hover:border-[#0000FF] hover:scale-[1.02] transition-all shadow-2xl active:scale-95"
          >
            Modelos
          </Link>
        </div>
      </div>

      {/* AJUSTE: bottom-6 para subir un poco los puntitos */}
      <div className="absolute bottom-6 left-0 right-0 z-[50] flex justify-center items-center gap-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`
                h-1.5 transition-all duration-500 cursor-pointer rounded-full
                ${i === currentSlide 
                  ? 'w-16 bg-[#FFD700] shadow-[0_0_15px_#FFD700]' 
                  : 'w-4 bg-white/30 hover:bg-white/60'}
              `}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
      </div>
    </section>
  );
};

export default Banner;