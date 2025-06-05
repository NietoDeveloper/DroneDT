import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../components/Layout";
import { toast } from "react-toastify";
import bin from "../assets/bin_icon.png";
import { useOutletContext } from "react-router-dom";

export default function List() {
  // Token
  const token = useOutletContext();

  const [products, setProducts] = useState([]);

  async function fetchList() {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        console.log(res.data.products);
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  async function removeProduct(id) {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message + "Hello");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/* Column Name */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Remove</b>
        </div>

        {/* Product List */}
        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm"
          >
            <img className="w-24" src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency}
              {product.price}
            </p>
            <div className="flex justify-center">
              <img
                onClick={() =>
                  toast.error(
                    "Feature is disabled. I don't want people to delete my DB"
                  )
                }
                // onClick={() => removeProduct(product._id)}
                className="w-5 cursor-pointer"
                src={bin}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
