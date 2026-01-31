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
    <section className="w-full bg-white overflow-hidden">
      {/* Contenedor Horizontal con Scroll */}
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {vehicles.map((item) => (
          <div 
            key={item.id} 
            className="relative h-[80vh] min-h-[500px] w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 flex flex-col items-center justify-between py-12 md:py-20 snap-center border-r border-white/10"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10"></div> {/* Overlay sutil */}
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-4">
              <h2 className="text-white drop-shadow-md font-semibold text-[clamp(32px,5vw,60px)] tracking-tight leading-none mb-2">
                {item.name}
              </h2>
              {item.promo ? (
                <p className="text-white drop-shadow-sm text-[clamp(14px,1.2vw,18px)] font-normal underline underline-offset-4 cursor-pointer hover:text-white/80 transition-colors">
                  {item.promo}
                </p>
              ) : (
                <p className="text-white font-medium text-[clamp(12px,1vw,14px)] uppercase tracking-[0.3em] opacity-90">
                  {item.category}
                </p>
              )}
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-[80%] sm:max-w-[400px] px-4 mb-8">
              <button className="flex-1 py-2.5 bg-white/90 backdrop-blur-md text-black font-medium text-xs rounded-[4px] hover:bg-white transition-all uppercase tracking-wider">
                Order Now
              </button>
              <button className="flex-1 py-2.5 bg-[#171a20cc] backdrop-blur-md text-white font-medium text-xs rounded-[4px] hover:bg-[#171a20] transition-all uppercase tracking-wider">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;