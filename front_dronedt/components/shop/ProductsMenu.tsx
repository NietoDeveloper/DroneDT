import React, { useState, useEffect } from 'react';

const ProductsMenu = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const dummyProducts = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Drone Model ${index + 1}`,
      price: Math.floor( * 500) + 100,
      image: `https://, // Placeholder para imágenes
      description: 'High-performance drone wi
    }));

