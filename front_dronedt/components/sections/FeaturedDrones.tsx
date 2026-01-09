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
        <header className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-headingColor mb-4 uppercase tracking-tighter">
            Nuestra Flota
          </h2>
          <div className="h-1 w-24 bg-yellowColor mx-auto"><
  

      
