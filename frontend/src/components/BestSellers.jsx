import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";
import agro3 from "../assets/agro3.png";

export default function BestSellers() {
  const { products } = useContext(ShopContext);

  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const best = products.filter((product) => product.bestseller);
    setBestProducts(best.slice(0, 5));
  }, [products]);

  const productElements = bestProducts.map((product, index) => (
    <ProductCard
      key={index}
      id={product._id}
      name={product.name}
      price={product.price}
      image={product.image}
    />
  ));

  return (
    <div className="my-10">
      <div className="text-3xl text-center py-8">
        <Title
          title1="EL MAS VENDIDO:"
          title2="CITY 1.1"
          caption=""
        />
      </div>

      <img className="sm:w-1/2" src={agro3} alt="" />

      {/* Rendering List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productElements}
      </div>
    </div>
  );
}
