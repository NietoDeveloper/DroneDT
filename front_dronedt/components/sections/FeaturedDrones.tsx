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

      </div>
    </section>
  );
}