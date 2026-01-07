import { FC } from 'react';

interface Drone {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface DroneModelsProps {
  title: string;
  drones: Drone[];
}

const DroneModels: FC<DroneModelsProps> = ({ title, drones }) => {
  return (
    <section className="py-20 bg-white px-4">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-tighter">{title}</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {drones.map((drone) => (
          <div key={drone.id} className="bg-main rounded-2xl p-8 flex flex-col items-center border border-gainsboro hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-2">{drone.name}</h3>
            <p className="text-gray-600 mb-4">{drone.description}</p>
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              [Imagen: {drone.name}]
            </div>
            <p className="text-xl font-bold text-yellowColor mb-4">
              ${drone.price.toLocaleString('es-CO')} COP
            </p>
            <button className="w-full py-3 bg-black text-white rounded-full font-bold">Configurar</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DroneModels;