import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

export default function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  async function loadOrderData() {

  }

  return (
    <div className="pt-16">
      <div className="text-2xl">
        <Title title1="MY" title2="ORDERS" />
      </div>

      <div>

              <div>
                  <p>
                  
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}

                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}

                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
