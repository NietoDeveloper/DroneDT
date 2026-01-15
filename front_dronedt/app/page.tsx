

            },
            { 
              icon: <ArrowRight style={{ color: gold }} />, 
              title: 'Soporte 24/7', 
              desc: 'Asistencia directa en Colombia para misiones críticas.' 
            },
            { 
              icon: <ArrowRight style={{ color: blueRey }} />, 
              title: 'NietoDevelooper Apps', 
              desc: 'Control total desde paneles operativos Next.js 15.' 
            },
          ]}
        />
      </div>

      {/* 4. TESTIMONIALS */}
      <Testimonials 
        title="Confianza en la Ingeniería DT"
        testimonials={[
          { 
            name: 'Carlos Rodríguez', 
            text: 'El soporte de Drone DT es inigualable. El rendimiento de los drones superó mis expectativas en campo.', 
            rating: 5 
          },
        ]}
      />

      {/* 5. FINAL CALL TO ACTION: Cierre de flujo */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#171a20] text-white overflow-hidden">
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 uppercase">
            Eleva tu <span style={{ color: gold }}>Perspectiva</span>
          </h2>
          <p className="text-xl text-gainsboro mb-12 opacity-80 font-medium">
            Únete a la élite tecnológica con ingeniería de Software DT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/shop/drones" 
              className="px-12 py-4 bg-white text-black font-bold rounded-md uppercase text-xs tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl"
              style={{ borderBottom: `4px solid ${gold}` }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = blueRey, e.currentTarget.style.color = "white")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white", e.currentTarget.style.color = "black")}
            >
              Comprar Ahora
            </Link>
            
            <Link 
              href="/demos" 
              className="px-12 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md uppercase text-xs tracking-[0.2em] transition-all hover:bg-white hover:text-black active:scale-95"
            >
              Agendar Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Créditos finales de racha */}
      <div className="bg-white py-4 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-widest">
          Build by Software DT | NietoDeveloper
        </p>
      </div>
    </div>
  );
};

export default Home;