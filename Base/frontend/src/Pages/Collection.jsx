import { useState } from "react";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";

export default function Collection() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* Left side */}
      <Filter
        category={category}
        setCategory={setCategory}

      <ProductList category={category} subCategory={subCategory} />
    </div>
  );
}
