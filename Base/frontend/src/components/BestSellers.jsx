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
        </div>
        <div className="flex justify-center w-full mb-8">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 cursor-pointer transition duration-300 hover:scale-[1.03] hover:shadow-2xl rounded-xl overflow-hidden block"
          >
            <img 
              className="w-full h-auto object-cover" 
              src={agro3} 
              alt="Drone CITY 1.1" 
            />
          </a>
        </div>
        <div className="space-y-2 mt-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700">
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