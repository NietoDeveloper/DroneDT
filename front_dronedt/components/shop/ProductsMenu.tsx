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
    };

    return (
        // bg-main usa el color #DCDCDC definido en tu config
        <div className="min-h-screen bg-main font-sans">
            <div className="container mx-auto px-4 py-12 max-w-[1900px] min-w-[310px]">
                <h1 className="text-4xl font-bold text-center mb-12 text-headingColor md:text-5xl uppercase tracking-wider">
                    Nuestra Flota <span className="text-yellowColor">DroneDT</span>
                </h1>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map(product => (
                        <div
                            key={product.id}
                            // bg-card usa #FFFFFF según tu estructura
                            className="bg-card rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-200"
                        >
                            <div className="relative overflow-hidden group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-gold text-headingColor font-bold px-3 py-1 rounded-full text-sm shadow-md">
                                    ${product.price}
                                </div>
                            </div>

                            <div className="p-5">
                                <h2 className="text-xl font-bold mb-2 text-headingColor truncate">
                                    {product.name}
                                </h2>
                                <p className="text-textColor text-sm mb-6 line-clamp-2 opacity-80">
                                    {product.description}
                                </p>

                                <button
                                    onClick={addToCart}
                                    // Usamos yellowColor para el botón de acción principal
                                    className="w-full bg-yellowColor hover:bg-gold text-headingColor font-bold py-3 px-4 rounded-lg transition duration-300 transform active:scale-95 shadow-md"
                                >
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Cart Button con el estilo Gold de DroneDT */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="relative bg-headingColor text-gold p-5 rounded-full shadow-2xl hover:scale-110 transition duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-yellowColor text-headingColor text-xs font-black rounded-full h-6 w-6 flex items-center justify-center border-2 border-headingColor">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductsMenu;