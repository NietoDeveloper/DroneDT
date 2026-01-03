import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import searchIcon from "../assets/search_icon.png";
import exitIcon from "../assets/cross_icon.png";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
 
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={searchIcon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}

        src={exitIcon}
        alt=""
      />
    </div>
  ) : null;
}
