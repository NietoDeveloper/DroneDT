import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import bin from "../assets/bin_icon.png";

export default function Cart() {
  const { cartItems, products, currency, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const cartElements = cartData.map((item, index) => {
: updateQuantity(item._id, item.size, Number(e.target.value))
          }
          type="number"
          min={1}
          defaultValue={item.quantity}

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
