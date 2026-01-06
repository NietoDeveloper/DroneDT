// front/app/page.tsx
import { FC } from 'react';
import Link from 'next/link';

// Componentes secciones (crea estos en front/components/sections/)
import Hero from '@/components/sections/Hero'; // Hero dinámico
import DroneModels from '@/components/sections/DroneModels'; // Cards drones
import Features from '@/components/sections/Features'; // Ventajas
import Testimonials from '@/components/sections/Testimonials'; // Opiniones

const Home: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero - Inspirado en Tesla: Full-screen, video bg, CTA centrado */}
      <Hero 
        title="DroneDT: Drones Inteligentes para Colombia"
        subtitle="Fabricados con innovación, inspirados en el futuro. Explora nuestra línea de drones premium."
        ctaText="Descubre Modelos"
        ctaLink="/shop/drones"
        videoSrc="/videos/drone-hero.mp4" // Asset en public/videos (optimiza con Next/Image o video tag)
      />

      {/* Sección Modelos Drones - Cards responsive como Tesla models */}
      <DroneModels 
        title="Nuestros Modelos"
        drones={[
          { id: 1, name: 'Drone X1', description: 'Alta autonomía, cámara 4K', price: 1500000, image: '/images/drone-x1.jpg' },
          { id: 2, name: 'Drone Pro', description: 'Para profesionales, GPS avanzado', price: 2500000, image: '/images/drone-pro.jpg' },
          // Fetch real desde back/api/drones en useEffect o SSG
        ]}
      />

      {/* Sección Features - Icons + texto, grid responsive */}
      <Features 
        title="Por Qué Elegir DroneDT"
        features={[
          { icon: '🚀', title: 'Innovación', desc: 'Tecnología de vanguardia inspirada en Tesla.' },
          { icon: '🌎', title: 'Hecho en Colombia', desc: 'Fabricación local con estándares globales.' },
          { icon: '🔋', title: 'Autonomía Superior', desc: 'Baterías de larga duración para vuelos extendidos.' },
        ]}
      />

      {/* Sección Testimonials - Carrusel o cards */}
      <Testimonials 
        title="Lo Que Dicen Nuestros Clientes"
        testimonials={[
          { name: 'Juan Pérez', text: 'El mejor drone para fotografía aérea en Colombia.', rating: 5 },
          // Fetch desde back/api/testimonials
        ]}
      />

      {/* CTA Final - Similar a Tesla footer CTA */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para Volar?</h2>
        <Link href="/shop" className="px-8 py-4 bg-white text-black rounded hover:bg-gray-200 transition-colors">
          Ir a la Tienda
        </Link>
      </section>
    </div>
  );
};

export default Home;