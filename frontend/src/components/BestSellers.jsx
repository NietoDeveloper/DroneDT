import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import agro3 from "../assets/agro3.png";

export default function BestSellers() {
  const { products } = useContext(ShopContext);

  // Mantenemos la estructura de estado y efecto por si se requiere en el futuro
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const best = products.filter((product) => product.bestseller);
    setBestProducts(best.slice(0, 5));
  }, [products]);

  // Se omite productElements y ProductCard ya que no se usan en la vista final pedida

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-white text-gray-700">
      
      <div className="w-full max-w-6xl flex flex-col items-center">
        
        <div className="text-3xl text-center py-8 w-full">
          <Title
            title1="EL MÁS VENDIDO:"
            title2="CITY 1.1"
            caption="Haz clic en la imagen para ver el producto."
          />
        </div>

        {/* Imagen como Botón/Enlace Centrado */}
        <div className="w-full flex justify-center py-6">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full max-w-3xl cursor-pointer transition duration-300 hover:scale-[1.03] hover:shadow-2xl rounded-xl overflow-hidden"
          >
            <img 
              className="w-full h-auto object-cover rounded-xl shadow-lg" 
              src={agro3} 
              alt="Producto Más Vendido City 1.1" 
            />
          </a>
        </div>
      
        {/* El div de Rendering List se mantiene vacío para mantener la estructura original si fuera necesario */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 w-full mt-8">
          {/* Aquí iría {productElements} si se usaran */}
        </div>
      </div>
    </div>
  );
}