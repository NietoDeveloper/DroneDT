import { Link, NavLink, useLocation } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";
import search from "..
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
