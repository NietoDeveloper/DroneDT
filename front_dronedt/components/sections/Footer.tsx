import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm font-light py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-8">

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">DroneDT</h3>
            <Link href="/" className="hover:text-white transition-colors duration-200">Inicio</Link>
            <Link href="/about" className="hover:text-white transition-colors duration-200">Acerca de</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">Contacto</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">Tienda</h3>
            <Link href="/products/drones" className="hover:text-white transition-colors duration-200">Drones</Link>
            <Link href="/products/accesorios" className="hover:text-white transition-colors duration-200">Accesorios</Link>
            <Link href="/services" className="hover:text-white transition-colors duration-200">Servicios</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">Soporte</h3>
            <Link href="/support/faq" className="hover:text-white transition-colors duration-200">FAQ</Link>
            <Link href="/support/manuales" className="hover:text-white transition-colors duration-200">Manuales</Link>
            <Link href="/support/garantia" className="hover:text-white transition-colors duration-200">Garantía</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">Paneles</h3>
            <Link href="/panel/cliente" className="hover:text-white transition-colors duration-200">Panel Cliente</Link>
            <Link href="/panel/empleados" className="hover:text-white transition-colors duration-200">Panel Empleados</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">Legal</h3>
            <Link href="/legal/privacidad" className="hover:text-white transition-colors duration-200">Privacidad</Link>
            <Link href="/legal/terminos" className="hover:text-white transition-colors duration-200">Términos</Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors duration-200">Cookies</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium mb-2">Tecnologías De Vanguardia</h3>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Next.js</a>
            <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Node.js</a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">React</a>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Tailwind CSS</a>
            <a href="https://expressjs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Express</a>
            <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">MongoDB Atlas</a>
           
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;