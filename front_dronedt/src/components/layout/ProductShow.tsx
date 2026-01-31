"use client";

import React from 'react';

interface VehicleCard {
  id: string;
  category: string;
  name: string;
  promo?: string;
  image: string;
}

const vehicles: VehicleCard[] = [
  {
    id: "1",
    category: "Industrial Drone",
    name: "Model X-1",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1800",
  },
  {
    id: "2",
    category: "Cinematic FPV",
    name: "Model DT-3",
    image: "https://images.unsplash.com/photo-1533230393035-73f114092243?auto=format&fit=crop&q=80&w=1800",
  },
  {
    id: "3",
    category: "Utility Cargo",
    name: "Lift Pro",
    promo: "3.99% APR Disponible",
    image: "https://images.unsplash.com/photo-1521749831539-67c790c02795?auto=format&fit=crop&q=80&w=1800",
  },
  {
    id: "4",
    category: "Luxury Surveillance",
    name: "Eagle Eye",
    promo: "3.99% APR Disponible",
    image: "https://images.unsplash.com/photo-1473960104312-bf2e12834e54?auto=format&fit=crop&q=80&w=1800",
  }
];

const ProductShow = () => {
  return (
    <section 
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white"
      style={{ scrollbarWidth: 'none' }} // Esconde scrollbar en Firefox
    >
      {vehicles.map((item) => (
        <div 
          key={item.id} 
          className="relative h-[85vh] md:h-[90vh] w-full flex flex-col items-center justify-between py-12 md:py-20 snap-start border-b-[6px] border-white overflow-hidden"
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Top: Escala desde móviles de 210px hasta 1900px */}
          <div className="relative z-10 text-center px-4 mt-10">
            <h2 className="text-black font-medium text-[clamp(28px,6vw,56px)] tracking-tight leading-none mb-2">
              {item.name}
            </h2>
            {item.promo ? (
               <p className="text-black text-[clamp(14px,1.5vw,20px)] font-normal underline underline-offset-4 cursor-pointer hover:text-black/70 transition-colors">
                {item.promo}
               </p>
            ) : (
              <p className="text-black font-medium text-[clamp(14px,1.5vw,18px)] uppercase tracking-wide">
                {item.category}
              </p>
            )}
          </div>

          {/* Buttons Bottom: Responsive Dinámico */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-[90%] sm:max-w-[640px] px-6 mb-8 md:mb-12">
            <button className="flex-1 py-[clamp(10px,1.2vw,16px)] px-4 bg-[#171a20cc] backdrop-blur-sm text-white font-medium text-[clamp(12px,1vw,15px)] rounded-[4px] hover:bg-[#171a20] transition-all uppercase tracking-tight">
              Order Now
            </button>
            <button className="flex-1 py-[clamp(10px,1.2vw,16px)] px-4 bg-[#f4f4f4a6] backdrop-blur-sm text-[#393c41] font-medium text-[clamp(12px,1vw,15px)] rounded-[4px] hover:bg-[#f4f4f4] transition-all uppercase tracking-tight">
              Learn More
            </button>
          </div>
        </div>
      ))}

      {/* Footer Visual para el efecto de media tarjeta final */}
      <div className="h-[15vh] bg-white flex items-center justify-center">
        <p className="text-gray-400 text-xs">Drone DT © 2026</p>
      </div>
    </section>
  );
};

export default ProductShow;