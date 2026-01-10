import React, { useState, useEffect } from 'react';

const ProductsMenu = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Simulación de fetch de productos desde API (máximo 20)
  useEffect(() => {
    // En producción, reemplaza con fetch real a tu API en Express/Mongo
    const dummyProducts = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Drone Model ${index + 1}`,
      price: Math.floor(Math.random() * 500) + 100,
      image: `https://via.placeholder.com/300x200?text=Drone+${index + 1}`, // Placeholder para imágenes
      description: 'High-performance drone with advanced features.',
    }));
    setProducts(dummyProducts.slice(0, 20)); // Asegura máximo 20
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-[1900px] min-w-[310px]">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 md:text-5xl lg:text-6xl">
          Nuestros Drones
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="">

                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <button
                  onClick={addToCart}
                  ext-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opción anclada para el carrito (fixed/floating) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="relative bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-200">
          Carrito
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductsMenu;