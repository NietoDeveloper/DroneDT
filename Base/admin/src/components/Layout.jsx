import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Login from "./Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

export default function Layout() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Header setToken={setToken} />
          <div className="flex">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet context={token} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
