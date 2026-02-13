// src/features/drones/components/ProductDetailsPage.tsx
import React from 'react';
import { DroneSpec } from '../data/specs';
import { Accessory } from '../data/accessories';

interface ProductDetailsPageProps {
  product: DroneSpec;
  accessories: Accessory[];
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, accessories }) => {
  return (
    <div className="min-h-screen bg-[#DCDCDC] animate-fadeIn">
      {/* Contenedor Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Card de Producto Estilo Software DT */}
        <div className="bg-white rounded-none border-t-8 border-[#FFD700] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Visualización del Drone */}
            <div className="p-8 bg-[#F8F8F8] flex flex-col items-center justify-center border-r border-[#DCDCDC]">
              <div className="relative group">
                <img 
                  src={product.image} 
                  alt={product.model} 
                  className="w-full h-auto max-h-[450px] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-[#000000] text-[#FFD700] px-4 py-1 text-xs font-black tracking-widest uppercase">
                  {product.status}
                </div>
              </div>
            </div>

            {/* Información y Acción */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <nav className="flex mb-4 text-xs font-bold uppercase text-gray-400 gap-2">
                  <span>Flota</span> / <span>{product.category}</span>
                </nav>
                
                <h1 className="text-5xl font-black text-[#000000] leading-none mb-4">
                  {product.model.toUpperCase()}
                </h1>
                
                <p className="text-3xl font-mono font-bold text-[#FEB60D] mb-8">
                  ${product.price.toLocaleString()} <span className="text-sm text-gray-500">USD / SERVICE</span>
                </p>

                {/* Grid de Specs Técnicas */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                  <SpecItem label="Autonomía" value={product.specs.flightTime} />
                  <SpecItem label="Rango" value={product.specs.range} />
                  <SpecItem label="Carga Útil" value={product.specs.payload} />
                  <SpecItem label="Velocidad Máx" value={product.specs.topSpeed} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase text-gray-400 tracking-tighter">Características Pro</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((f, i) => (
                      <span key={i} className="bg-[#DCDCDC] text-[#000000] px-3 py-1 text-[10px] font-bold rounded-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Acción Principal (Integración con Booking) */}
              <button className="mt-12 w-full bg-[#FFD700] hover:bg-[#000000] hover:text-[#FFD700] text-[#000000] font-black py-5 px-8 transition-all duration-300 transform hover:-translate-y-1 shadow-xl uppercase tracking-widest">
                Configurar para Misión
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Accesorios Compatibles */}
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-[#000000] uppercase tracking-tighter">Accesorios Recomendados</h2>
            <div className="flex-1 h-[2px] bg-[#FFD700]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.length > 0 ? (
              accessories.map((acc) => (
                <div key={acc.id} className="bg-white p-6 border-b-4 border-[#FEB60D] hover:shadow-lg transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{acc.category}</p>
                  <h4 className="font-bold text-[#000000] mt-1">{acc.name}</h4>
                  <p className="text-[#FEB60D] font-mono mt-4 text-sm">${acc.price}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay accesorios específicos para este modelo.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// Componente Interno para consistencia en Specs
const SpecItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border-l-2 border-[#DCDCDC] pl-4">
    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{label}</p>
    <p className="text-lg font-black text-[#000000]">{value}</p>
  </div>
);