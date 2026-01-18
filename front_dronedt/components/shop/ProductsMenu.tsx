import React, { useState, useEffect } from 'react';

// Definimos la interfaz para mantener el estándar de TypeScript de DroneDT
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const ProductsMenu: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        // Simulación de fetch ajustada a la lógica de DroneDT
        const dummyProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            name: `Drone Model ${index + 1}`,
            price: Math.floor(Math.random() * 500) + 100,
            image: `https://via.placeholder.com/300x200?text=Drone+${index + 1}`,
            description: 'High-performance drone with advanced features.',
        }));
        setProducts(dummyProducts);
    }, []);

    const addToCart = () => {
        setCartCount(prev => prev + 1);

    );
};

export default ProductsMenu;