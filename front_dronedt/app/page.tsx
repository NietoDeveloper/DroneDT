import { FC } from 'react';
import Link from 'next/link';

// Componentes secciones (Asegúrate de haber creado los archivos en front/components/sections/)
import Hero from '@/components/sections/Hero'; 
import DroneModels from '@/components/sections/DroneModels'; 
import Features from '@/components/sections/Features'; 
import Testimonials from '@/components/sections/Testimonials';

/**
 * DroneDT Home Page
 * Diseño de clase mundial inspirado en Tesla.com
 */
const Home: FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION: Impacto Visual Inmediato */}
      <Hero 
        title="Drone D T: Technologia Colombiana"
        subtitle="Fabricados con innovación, inspirados en el futuro. Explora nuestra línea de drones premium."
        ctaText="Descubre Modelos"
        ctaLink="/shop/drones"
        videoSrc="/videos/drone-hero.mp4" 
      />

      {/* 2. DRONE MODELS: Grid de productos con estética minimalista */}
      <section className="bg-white">
        <DroneModels 
          title="Nuestros Modelos"
          drones={[
            { 
              id: 1, 
              name: 'Drone X1', 
              description: 'Alta autonomía, cámara 4K', 
              price: 1500000, 
              image: '/images/drone-x1.jpg' 
            },
            { 
              id: 2, 
              name: 'Drone Pro', 
              description: 'Para profesionales, GPS avanzado', 
              price: 2500000, 
              image: '/images/drone-pro.jpg' 
            },
          ]}
        />
      </section>

      {/* 3. FEATURES: Propuesta de Valor (Software DT Identity) */}
      <Features 
        title="Por Qué Elegir DroneDT"
        features={[
          { icon: '🚀', title: 'Innovación', desc: 'Tecnología de vanguardia inspirada en estándares globales.' },
          { icon: '🌎', title: 'Hecho en Colombia', desc: 'Fabricación local por NietoDeveloper para el mundo.' },
          { icon: '🔋', title: 'Autonomía Superior', desc: 'Baterías de larga duración para misiones críticas.' },
        ]}
      />

      {/* 4. TESTIMONIALS: Prueba Social para credibilidad de marca */}
      <Testimonials 
        title="Lo Que Dicen Nuestros Clientes"
        testimonials={[
          { name: 'Juan Pérez', text: 'La ingeniería detrás de estos drones es excepcional. Orgullo colombiano.', rating: 5 },
        ]}
      />

      {/* 5. FINAL CALL TO ACTION: Cierre de flujo de conversión */}
      <section className="bg-black text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            ¿Listo para llevar tu visión al cielo?
          </h2>
          <p className="text-gainsboro mb-10 text-lg opacity-80">
            Únete a la nueva era de la aeronáutica colombiana.
          </p>
          <Link 
            href="/shop" 
            className="inline-block px-12 py-4 bg-white text-black font-bold rounded-full hover:bg-yellowColor hover:text-black transition-all transform active:scale-95 shadow-xl"
          >
            Ir a la Tienda
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;