import Image from 'next/image';
import Link from 'next/link';


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


                <div className="flex gap-4 mt-8">
                  <Link 
                    href={`/shop/drones/${drone.id}`}
                    className="flex-1 bg-headingColor text-white text-center py-3 rounded-md font-bold hover:bg-opacity-90 transition-colors uppercase text-sm tracking-widest"
                  >
                    Explorar
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}