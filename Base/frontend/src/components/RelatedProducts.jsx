import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([])

  return (
    <div className="my-24">
      <div className="text-3xl text-center">
        <Title title1="RELATED" title2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product, index) => (
          <ProductCard
  
 
       
          />
        ))}
      </div>
    </div>
  );
}
