import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

export default function BestSellers() {
  const { products } = useContext(ShopContext);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const best = products.filter((product) => product.bestseller);
    setBestProducts(best.slice(0, 3));
  }, [products]);

  const productElements = bestProducts.map((product) => (
    <div 
      key={product._id} 
      className="flex flex-col items-center p-4"
    >
      <a 
        href="#" // Enlace vacío listo para customizar
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-full h-auto flex flex-col items-center cursor-pointer transition duration-300 hover:scale-[1.05] hover:shadow-2xl rounded-xl group"
      >
        <img 
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg group-hover:opacity-90" 
          src={product.image} 
          alt={product.name} 
        />
        <p className="font-bold text-lg mt-3 text-gray-800 text-center transition-colors group-hover:text-red-600">
          {product.name}
        </p>
      </a>
    </div>
  ));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50 text-gray-700">
      
      <div className="w-full max-w-6xl">
        <div className="text-3xl text-center py-8">
          <Title
            title1="PRODUCTOS"
            title2="MÁS VENDIDOS"
            caption="Descubre nuestros tres productos estrella de la temporada."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {productElements.length > 0 ? (
            productElements
          ) : (
            <p className="col-span-full text-center text-xl text-gray-500 py-10">
              Cargando o no hay productos marcados como más vendidos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}