import { useState } from "react";
import clothixLogo from "../assets/clothixLogo.svg";
import axios from "axios";
import { backendUrl } from "./Layout";
import { toast } from "react-toastify";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("admin@clothix.com");
  const [password, setPassword] = useState("admin123");

  async function onSubmitHandler(e) {
    try {
      e.preventDefault();
      const res = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        {/* Company's Logo */}
        <div className="flex gap-2 mb-4">
          <img src={clothixLogo} alt="" />
          <div className="flex flex-col sm:flex-row sm:items-end">
            <p className="logo-font items-center">Drone DT</p>
            <p className="text-xs sm:pl-1">Admin Panel</p>
          </div>
        </div>
        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 rounded-md bg-black text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
