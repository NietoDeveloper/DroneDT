import Image from 'next/image';
import Link from 'next/link';

// Simulación de datos (En el futuro esto vendrá de tu /back/api/drones)
const DRONES_DATA = [
  {
    id: 'dt-01',
    name: 'DT-Pro Phantom',
    description: 'Precisión quirúrgica para cinematografía aérea.',
    image: '/images/drones/drone-1.webp', // Asegúrate de que este archivo exista
    price: '2.499 USD'
  },
  {
    id: 'dt-02',
    name: 'DT-Speed Racer',
    description: 'Velocidad pura con transmisión de latencia cero.',
    image: '/images/drones/drone-2.webp',
    price: '1.899 USD'
  }
];

export default function FeaturesDrones() {
  return (
    <section className="bg-main py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {DRONES_DATA.map((drone) => (
            <div 
              key={drone.id} 
              className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200"
            >


              {/* Información del Producto */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-headingColor uppercase">{drone.name}</h3>
                    <p className="text-gray-600 mt-2 max-w-xs">{drone.description}</p>
                  </div>
                  <span className="text-xl font-bold text-yellowColor">{drone.price}</span>
                </div>

                <div className="flex gap-4 mt-8">
                  <Link 
                    href={`/shop/drones/${drone.id}`}
                    className="flex-1 bg-headingColor text-white text-center py-3 rounded-md font-bold hover:bg-opacity-90 transition-colors uppercase text-sm tracking-widest"
                  >
                    Explorar
                  </Link>
                  <button className="px-6 py-3 border-2 border-gold text-headingColor rounded-md font-bold hover:bg-gold transition-colors uppercase text-sm">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}