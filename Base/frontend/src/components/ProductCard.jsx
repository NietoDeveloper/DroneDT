import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export default function ProductCard({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`}>
      <div className="overflow-hidden h-[300px] border rounded-lg p-4 shadow-sm text-gray-700">
        <img

  );
}
