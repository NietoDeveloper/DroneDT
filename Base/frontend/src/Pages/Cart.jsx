import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import bin from "../assets/bin_icon.png";

export default function Cart() {


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

            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
