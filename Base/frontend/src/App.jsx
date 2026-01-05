import { BrowserRouter, Route, Routes } from "react-router-dom";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Layout from "./components/Layout";
import Homepage from "./Pages/Homepage";
import ShopContextProvider from "./Context/ShopContext";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

import Orders from "./Pages/Orders";


export default function App() {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  );
}
