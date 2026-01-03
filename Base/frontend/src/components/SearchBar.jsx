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

      
    </div>
  ) : null;
}
