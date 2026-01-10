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
      <div className="container my-8 max-w-[1900px] min-w-[310px]">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 md:text-5xl lg:text-6xl">

        </h1>


      </div>
    </div>
  );
};

export default ProductsMenu;