import exchange from "../assets/exchange_icon.png";
import quality from "../assets/quality_icon.png";
import support from "../assets/support_img.png";

/**
 * Componente Policy
 * * Muestra las políticas de la tienda (intercambio, devolución, soporte).
 * Ajustado para ocupar el 100% de la altura de la vista (min-h-screen) y ser totalmente responsivo.
 * Utiliza un diseño de columna en móviles y pasa a fila en pantallas medianas (md).
 */
export default function Policy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-white text-gray-700">

      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-around gap-10 md:gap-8 py-10 md:py-0 text-center">
 
        <div className="flex flex-col items-center p-4 md:p-6 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <img className="w-14 h-14 object-contain mb-4" src={exchange} alt="Icono de Intercambio" />
          <p className="font-bold text-lg text-gray-800">Política de Cambio Fácil</p>
          <p className="text-gray-500 mt-1">Ofrecemos una política de cambio sin complicaciones.</p>
        </div>

        <div className="flex flex-col items-center p-4 md:p-6 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <img className="w-14 h-14 object-contain mb-4" src={quality} alt="Icono de Calidad" />
          <p className="font-bold text-lg text-gray-800">Política de Devolución de 7 Días</p>
          <p className="text-gray-500 mt-1">Proporcionamos una política de devolución de 7 días.</p>
        </div>

        <div className="flex flex-col items-center p-4 md:p-6 rounded-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <img className="w-14 h-14 object-contain mb-4" src={support} alt="Icono de Soporte" />
          <p className="font-bold text-lg text-gray-800">El Mejor Soporte al Cliente</p>
          <p className="text-gray-500 mt-1">Ofrecemos soporte al cliente 24/7.</p>
        </div>
        
      </div>
      
    </div>
  );
}