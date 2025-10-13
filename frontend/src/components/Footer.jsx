import { Link } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";

export default function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <div className="flex gap-2 items-center mb-5 cursor-default">
            <img src={clothixLogo} alt="" />
            <h1 className="logo-font items-center">Dron D T</h1>
          </div>
          <p className="w-full sm:w-2/3 text-gray-600">
            L.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Empresa</p>
          <div className="flex flex-col flex-1 text-gray-600">
            <Link to="/" className="mb-2 w-fit">
              Home
            </Link>
            <Link to="about" className="mb-2 w-fit">
              About Us
            </Link>
            <Link to="contact" className="mb-2 w-fit">
              Contact Us
            </Link>
            <p className="mb-2">Delivery</p>
            <p className="mb-2">Privacy policy</p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <div className="flex flex-col flex-1 text-gray-600">
            <p className="mb-2">+123 456 7890</p>
            <p className="mb-2">contacto@drondt.com</p>
          </div>
        </div>
      </div>
      <hr />
      <p className="py-5 text-sm text-center">2025 Created by NietoDeveloper ©</p>
    </div>
  );
}
