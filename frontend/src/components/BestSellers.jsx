import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom"; // Asumiendo el uso de react-router-dom

// Componente dummy para representar la imagen/botón del producto
function BestSellerCard({ id, name, image }) {
  const navigate = useNavigate();

  const goToProductList = () => {
    // Aquí es donde navegarías al componente ProductList.jsx
    // Por ejemplo: navigate('/productos'); o navigate('/productos/' + id);
    navigate('/productos'); 
    console.log(`Navegando a la lista de productos o al detalle de: ${name}`);
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 cursor-pointer transition duration-300 hover:scale-[1.05] hover:shadow-2xl rounded-xl">
      <button onClick={goToProductList} className="w-full h-auto">
        <img 
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" 
          src={image} 
          alt={name} 
        />
      </button>
      <p className="font-bold text-lg mt-3 text-gray-800 text-center">{name}</p>
    </div>
  );
}

export default function BestSellers() {
  const { products } = useContext(ShopContext);

  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const best = products.filter((product) => product.bestseller);
    // Tomar solo los 3 primeros productos más vendidos
    setBestProducts(best.slice(0, 3)); 
  }, [products]);

  const productElements = bestProducts.map((product) => (
    <BestSellerCard
      key={product._id}
      id={product._id}
      name={product.name}
      image={product.image}
    />
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

        {/* Rendering List: Grid de 3 columnas para los productos más vendidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {productElements.length > 0 ? (
            productElements
          ) : (
            <p className="col-span-full text-center text-xl text-gray-500">
              Cargando o no hay productos marcados como más vendidos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}