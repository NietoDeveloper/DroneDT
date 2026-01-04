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

      </div>




              </div>

              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
