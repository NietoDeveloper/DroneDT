import { Link, NavLink, useLocation } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";
import search from "../asol gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p classNa
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
