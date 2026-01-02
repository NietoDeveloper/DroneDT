import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export default function ProductCard({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`}>
      <div className="overflow-hidden h-[300px] border rounded-lg p-4 shadow-sm text-gray-700">
        <img
          className="overflow-hidden w-full h-44 object-cover mb-2 rounded hover:scale-110 transition ease-in-out duration-500"
          src={image[0]}
          alt=""
        />
        <p className="pt-1 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
        </p>
      </div>
    </Link>
  );
}
