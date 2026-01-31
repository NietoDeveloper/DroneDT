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
    <section className="w-full bg-white">
      {vehicles.map((item) => (
        <div 
          key={item.id} 
          className="relative h-screen w-full flex flex-col items-center justify-between py-12 md:py-20 overflow-hidden snap-start"
        >
          {/* Background Image - Full Cover */}
          <div className="absolute inset-0 z-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content Top: Centrado y Limpio */}
          <div className="relative z-10 text-center px-4 mt-8 md:mt-12">
            <h2 className="text-black font-semibold text-[clamp(40px,7vw,80px)] tracking-tight leading-none mb-2">
              {item.name}
            </h2>
            {item.promo ? (
              <p className="text-black text-[clamp(16px,1.5vw,22px)] font-normal underline underline-offset-4 cursor-pointer hover:text-black/70 transition-colors">
                {item.promo}
              </p>
            ) : (
              <p className="text-black font-medium text-[clamp(14px,1.2vw,18px)] uppercase tracking-[0.2em]">
                {item.category}
              </p>
            )}
          </div>

          {/* Buttons Bottom: El clásico estilo horizontal de Tesla */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-[90%] sm:max-w-[550px] lg:max-w-[650px] px-6 mb-12">
            <button className="flex-1 py-3 px-10 bg-[#171a20cc] backdrop-blur-md text-white font-medium text-sm rounded-[4px] hover:bg-[#171a20] transition-all uppercase tracking-wider">
              Order Now
            </button>
            <button className="flex-1 py-3 px-10 bg-[#f4f4f4a6] backdrop-blur-md text-[#393c41] font-medium text-sm rounded-[4px] hover:bg-[#f4f4f4] transition-all uppercase tracking-wider border-none">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductShow;