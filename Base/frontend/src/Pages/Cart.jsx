import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import bin from "../assets/bin_icon.png";

export default function Cart() {
  const { cartItems, products, currency, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempCart = [];
      for (const item in cartItems) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size] > 0) {
            tempCart.push({
              _id: item,
              size: size,
              quantity: cartItems[item][size],
            });
          }
        }
      }
      setCartData(tempCart);
    }
  }, [cartItems, products]);

  const cartElements = cartData.map((item, index) => {
    const productsData = products.find((product) => product._id === item._id);

    return (
      <div
        key={index}
        className="py-4 border-t border-b text-gray-700 grid  grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
      >
        <div className="flex items-start gap-6">
          <img className="w-16 sm:w-20" src={productsData.image[0]} alt="" />
          <div>
            <p className="text-sm sm:text-lg font-medium">
              {productsData.name}
            </p>

            <div className="flex items-center gap-5 mt-2">
              <p>
                {currency}
                {productsData.price}
              </p>
              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                {item.size}
              </p>
            </div>
          </div>
        </div>
        <input
          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
          onChange={(e) =>
            e.target.value === "" || e.target.value === "0"
              ? null
              : updateQuantity(item._id, item.size, Number(e.target.value))
          }
          type="number"
          min={1}
          defaultValue={item.quantity}
        />
        <img
          className="w-4 mr-4 sm:w-5 cursor-pointer"
          onClick={() => updateQuantity(item._id, item.size, 0)}
          src={bin}
          alt=""
        />
      </div>
    );
  });

  return (
    <div className="pt-14">
      <div className="text-2xl">
        <Title title1="YOUR" title2="CART" />
      </div>
      <div>{cartElements}</div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              disabled={cartData.length === 0 ? true : false}
              className={`bg-black text-white text-sm px-8 py-3 my-8 ${
                cartData.length === 0 ? "cursor-not-allowed bg-[#C6C6C6]" : ""
              }`}
              onClick={() => navigate("/place-order")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
