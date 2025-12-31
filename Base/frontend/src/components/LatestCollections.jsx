import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";
import dron1 from "../assetss


  return (src={dron1} alt="" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productElements}
      </div>
    </div>
  );
}
