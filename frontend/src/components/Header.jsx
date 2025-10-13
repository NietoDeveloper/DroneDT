import { Link, NavLink, useLocation } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";
import search from "../assets/search_icon.png";
import profile from "../assets/profile_icon.png";
import cart from "../assets/cart_icon.png";
import menu from "../assets/menu_icon.png";
import backArrow from "../assets/back_arrow_icon.png";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();

  function logout() {
    navigate("login");
    toast.success("Logged out");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  return (
    <nav className="flex justify-between items-center py-5 font-medium border-b">
      <Link to="." className="flex gap-2">
        <img src={clothixLogo} alt="" />
        <h1 className="logo-font items-center">Dron D T</h1>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="." className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="collection" className="flex flex-col items-center gap-1">
          <p>Productos</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {location.pathname.includes("collection") ? (
          <img
            className="cursor-pointer w-5"
            onClick={() => setShowSearch(true)}
            src={search}
            alt=""
          />
        ) : (
          <div className="w-5"></div>
        )}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="cursor-pointer w-5"
            src={profile}
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My profile</p>
                <p
                  onClick={() => navigate("orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Order
                </p>
                <a
                  href="https://clothix-admin.vercel.app/"
                  target="_blank"
                  className="cursor-pointer hover:text-black"
                >
                  Admin Panel
                </a>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="cart" className="relative">
          <img className="cursor-pointer w-5" src={cart} alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          className="cursor-pointer w-5 sm:hidden"
          onClick={() => setVisible(true)}
          src={menu}
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white ease-in duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex cursor-pointer gap-4 items-center p-3"
            onClick={() => setVisible(false)}
          >
            <img className="h-4 rotate-180" src={backArrow} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
