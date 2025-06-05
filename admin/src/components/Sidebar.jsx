import { NavLink } from "react-router-dom";
import add from "../assets/add_icon.png";
import list from "../assets/menu_icon.png";
import order from "../assets/order_icon.png";

export default function Sidebar() {
  return (
    <div className="w-[19%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="add"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l justify-center sm:justify-normal"
        >
          <img className="w-5 h-5" src={add} alt="" />
          <p className="hidden sm:block">Add Items</p>
        </NavLink>
        <NavLink
          to="list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l justify-center sm:justify-normal"
        >
          <img className="w-5 h-5 scale-x-[-1]" src={list} alt="" />
          <p className="hidden sm:block">List Items</p>
        </NavLink>
        <NavLink
          to="orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l justify-center sm:justify-normal"
        >
          <img className="w-5 h-5" src={order} alt="" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}
