import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-headingColor text-gainsboro pt-16 pb-8 border-t-4 border-gold">
      <div className="mx-auto px-4 sm:px-8 w-full max-w-[1900px] min-w-[310px]">
        
        {/* Grid Principal - Responsive Dinámico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10 mb-12">

          {/* Identidad DroneDT */}
          <div className="flex flex-col space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-black text-2xl tracking-tighter uppercase">
              DRONE<span className="text-yellowColor">DT</span>
            </h3>
            <p className="text-xs leading-relaxed opacity-60 uppercase tracking-widest">
              Ingeniería aérea de vanguardia. Elevando los estándares de precisión en Colombia y el mundo.
            </p>
            <div className="flex space-x-4 pt-2">
               {/* Iconos sociales simplificados con hover Gold */}
               <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
               <Link href="/about" className="hover:text-gold transition-colors">Nosotros</Link>
            </div>
          </div>

          {/* Columna: Tienda */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-yellowColor font-bold text-sm uppercase tracking-[0.2em] mb-2">Ecosistema</h3>
            <Link href="/shop/drones" className="hover:text-white transition-colors text-xs uppercase font-medium">Modelos Drones</Link>
            <Link href="/shop/accesorios" className="hover:text-white transition-colors text-xs uppercase font-medium">Componentes</Link>
            <Link href="/shop/servicios" className="hover:text-white transition-colors text-xs uppercase font-medium">Servicios Técnicos</Link>
          </div>

          {/* Columna: Soporte */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-yellowColor font-bold text-sm uppercase tracking-[0.2em] mb-2">Soporte</h3>
            <Link href="/support/faq" className="hover:text-white transition-colors text-xs uppercase font-medium">FAQ</Link>
            <Link href="/support/manuales" className="hover:text-white transition-colors text-xs uppercase font-medium">Manuales Vuelo</Link>
            <Link href="/support/garantia" className="hover:text-white transition-colors text-xs uppercase font-medium">Garantía DT</Link>
          </div>

          {/* Columna: Paneles de Control (Arquitectura Separada) */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-yellowColor font-bold text-sm uppercase tracking-[0.2em] mb-2">Accesos</h3>
            <Link href="/panel/cliente" className="hover:text-white transition-colors text-xs uppercase font-medium">Panel Cliente</Link>
            <Link href="/panel/empleados" className="hover:text-white transition-colors text-xs uppercase font-medium">Panel Operativo</Link>
            <Link href="/admin" className="hover:text-white transition-colors text-xs uppercase font-medium font-bold text-gold/80">Administrador</Link>
          </div>

          {/* Columna: Legal */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-yellowColor font-bold text-sm uppercase tracking-[0.2em] mb-2">Legal</h3>
            <Link href="/legal/privacidad" className="hover:text-white transition-colors text-xs uppercase font-medium">Privacidad</Link>
            <Link href="/legal/terminos" className="hover:text-white transition-colors text-xs uppercase font-medium">Términos</Link>
          </div>

          {/* Columna: Stack Tecnológico (Optimizado para scannability) */}
          <div className="flex flex-col space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2">Stack DT</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 opacity-50 text-[10px] font-bold uppercase">
              <span>Next.js 15</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>MongoDB</span>
              <span>Docker</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>

        {/* Barra Inferior - Social & Región */}

            <a href="#" className="hover:text-gold transition-colors">X / TW</a> <a href="#" className="hover:text-gold transition-colors">FB / MET</a>
            <a href="#" className="hover:text-gold transition-colors">IG / DT</a>
          </div>
          
          <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest bg-black/40 px-6 py-2 rounded-full border border-gray-800">
            <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-gold">
              <option className="bg-headingColor">ES - COL</option>
             
            </select>
            <span className="text-gainsboro/50">|</span>
            <span>Bogotá, Colombia</span>
          </div>
        </div>

        {/* Copyright & Créditos */}
        <div className="text-center mt-12 pt-8 border-t border-gray-900">


        </div>
      </div>
    </footer>
  );
};

export default Footer;