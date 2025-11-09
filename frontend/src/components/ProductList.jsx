import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";

export default function ProductList({ category, subCategory }) {
  const { products, search, showSearch } = useContext(ShopContext);
  const [productsList, setProductsList] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  function applyFilterAndSort() {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // If sorting is applied, then set productlist
    switch (sortType) {
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setProductsList(productsCopy);
  }

  function sortFilter(e) {
    setSortType(e.target.value);
  }

  // Everytime category, subcategory and sortType changes, run applyFilterAndSort()
  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, sortType, search, showSearch, products]);

  const productElements = productsList.map((product, index) => (
    <ProductCard
      key={index}
      id={product._id}
      name={product.name}
      price={product.price}
      image={product.image}
    />
  ));

  return (
    <div className="flex-1">
      {/* Title & Filter */}
      <div className="flex justify-between text-base sm:text-xl lg:text-2xl mb-4">
        <Title title1="ALL" title2="COLLECTIONS" />
        <select
          onChange={sortFilter}
          value={sortType}
          className="border border-gray-300 text-sm px-2 sm:h-[40px]"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="high-low">Sort by: High to Low</option>
          <option value="low-high">Sort by: Low to High</option>
        </select>
      </div>
      {/* Products List */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
        {productElements}
      </div>
    </div>
  );
}
