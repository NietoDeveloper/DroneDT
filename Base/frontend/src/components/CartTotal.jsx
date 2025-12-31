import { useContext } from "react";
import Title from "./Title";
imx justify-between">
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
