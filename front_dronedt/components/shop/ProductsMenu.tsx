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

