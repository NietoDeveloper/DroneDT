import { Link } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";
import arrow from "../assets/back_arrow_icon.png";

export default function Header({ setToken }) {
  return (
    <nav className="flex justify-between items-center py-5 px-10 font-medium border-b">
      <div className="flex gap-2">
        <img src={clothixLogo} alt="" />
        <div className="flex flex-col sm:flex-row sm:items-end">
          <p className="logo-font items-center">DroneDT</p>
          <p className="text-xs sm:pl-1">Admin Panel</p>
        </div>
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
        <a
          href="https://clothix.vercel.app/"
          target="_blank"
          className="flex items-center cursor-pointer"
        >
          <p className="hover:underline text-sm sm:text-base"></p>
          <img className="h-4 pl-2" src={arrow} alt="" />
        </a>
      </div>
    </nav>
  );
}
