import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

export default function LatestCollections() {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  const productElements = latestProducts.map((product, index) => (
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
          title1="LATEST"
          title2="COLLECTION"
          caption="Discover our newest arrivals that blend style and comfort. Explore the latest trends in fashion, curated just for you."
        />
      </div>

      {/* Rendering List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productElements}
      </div>
    </div>
  );
}
