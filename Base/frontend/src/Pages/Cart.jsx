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

          </div>
        </div>
      </div>
    </div>
  );
}
