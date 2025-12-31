import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import agro3 from "../assets/agro3.png";

export default function BestSellers() {
  const { products } = useContext(ShopContext);

  c
            title2="MÁS VENDIDO"
            caption="Descubre el CITY 1.1, nuestro líder en ventas."
          />
   l font-extrabold text-blue-700">
            DRON CITY 1.1
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-600">
            Drone de alto rendimiento para agricultura de precisión.
          </h3>
          <h3 className="text-3xl font-bold text-green-600 pt-2">
            $25.500.000 COP
          </h3>
        </div>
      </div>
    </div>
  );
}