import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );

      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-3xl text-center">
        <Title title1="RELATED" title2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product, index) => (
          <ProductCard
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
