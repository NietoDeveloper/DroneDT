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

      </div>
        ))}
      </div>
    </div>
  );
}
