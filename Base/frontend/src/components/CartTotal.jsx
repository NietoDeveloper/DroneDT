import { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";

export default function CartTotal() {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();

  return (
    <>
      <div className="text-2xl">
        <Title title1="CART" title2="TOTAL" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {deliveryFee}.00
          </p>
        </div>
        <hr />

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>
            {currency}
            {subtotal === 0 ? 0 : subtotal + deliveryFee}.00
          </p>
        </div>
      </div>
    </>
  );
}
