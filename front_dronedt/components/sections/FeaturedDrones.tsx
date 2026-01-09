



import Image from 'next/image';
import Link from 'next/link';

// Simulación de datos
const DRONES_DATA = [
  {
    id: 'dt-01',
    name: 'DT-Pro Phantom',
    description: 'Precisión quirúrgica para cinematografía aérea.',
    image: '/images/drones/drone-1.webp',
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
    <section className="bg-main py-16 px-4 min-[310px]:px-6 md:px-12 lg:py-24 xl:px-24 2xl:px-0">
      <div className="max-w-[1900px] mx-auto">
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl min-[310px]:text-4xl md:text-5xl lg:text-6xl font-bold text-headingColor mb-4 uppercase tracking-tighter">
            Nuestra Flota
          </h2>
          <div className="h-1.5 w-20 md:w-32 bg-yellowColor mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center justify-center">
          {DRONES_DATA.map((drone) => (
            <div 
              key={drone.id} 
              className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 border border-black shadow-[0_10px_30px_-15px_rgba(254,182,13,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(255,215,0,0.4)] flex flex-col items-center text-center"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-[250px] min-[400px]:h-[350px] md:h-[400px] w-full bg-white overflow-hidden">
                <Image
                  src={drone.image}
                  alt={drone.name}
                  fill
                  className="object-contain p-6 md:p-10 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1900px) 50vw"
                />
              </div>

              {/* Información del Producto */}
              <div className="p-6 md:p-10 w-full flex flex-col items-center">
                <div className="w-full flex flex-col items-center mb-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-headingColor uppercase leading-tight">
                    {drone.name}
                  </h3>
                  <p className="text-textColor opacity-80 mt-3 text-sm md:text-base max-w-sm">
                    {drone.description}
                  </p>
                  <span className="text-2xl md:text-3xl font-bold text-yellowColor mt-4">
                    {drone.price}
                  </span>
                </div>

                <div className="flex flex-col min-[400px]:flex-row gap-4 w-full max-w-md">
                  <Link 
                    href={`/shop/drones/${drone.id}`}
                    className="flex-1 bg-headingColor text-white text-center py-3.5 rounded-lg font-bold hover:bg-yellowColor hover:text-headingColor transition-all duration-300 uppercase text-xs md:text-sm tracking-widest border border-black"
                  >
                    Explorar
                  </Link>
                  <button className="flex-1 px-6 py-3.5 border border-black bg-gold text-headingColor rounded-lg font-bold hover:bg-yellowColor transition-all duration-300 uppercase text-xs md:text-sm tracking-widest shadow-sm">
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