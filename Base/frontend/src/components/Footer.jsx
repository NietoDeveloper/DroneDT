import { Link } from "react-router-dom";
import clothixLogo from "../assets/clothixLogo.svg";

export default function Footer() {
  return (
    <div>
            <Link to="contact" className="mb-2 w-fit">
              Contactanos
            </Link>
            <p className="mb-2">Envio</p>
            <p className="mb-2">Politica De Privacidad</p>
          </div>
        </div>
      </div>
      <hr />
      <p className="py-5 text-sm text-center">2025 Created by NietoDeveloper ©</p>
    </div>
  );
}
