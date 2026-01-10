import React, { useState, useEffect } from 'react';

const ProductsMenu = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const dummyProducts = Array.from({ l
      name: `Drone Model ${index + 1}`

      description: 'High-performance drone wi
    }));

