import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (




    </div>
  );
}
