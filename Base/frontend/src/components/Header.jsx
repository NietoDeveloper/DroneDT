import { Link, NavLink, useLocation } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";
import search from "../asol gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">Mi Perfil</p>
                <p
                  onClick={() => navigate("orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Order
           /p>
              </div>
            </div>
          )}
        </div>
        <Link to="carnter w-5 sm:hidden"
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
            <p>Atras</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            Inicio
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="collection"
          >
            Productos
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="about"
          >
            Sobre
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="contact"
          >
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
