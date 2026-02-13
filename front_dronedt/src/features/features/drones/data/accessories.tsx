// src/features/drones/data/accessories.ts

export interface Accessory {
  id: string;
  name: string;
  category: 'Power' | 'Storage' | 'Optics' | 'Safety' | 'Maintenance';
  compatibility: string[]; // IDs de drones con los que es compatible
  price: number;
  stock: number;
  specs: {
    weight?: string;
    capacity?: string;
    material?: string;
  };
  image: string;
  featured?: boolean;
}

export const DRONE_ACCESSORIES: Accessory[] = [
  {
    id: 'acc-bat-01',
    name: 'Intelligent Flight Battery Plus',
    category: 'Power',
    compatibility: ['dt-01-titan', 'dt-03-cine'],
    price: 159.99,
    stock: 45,
    specs: {
      capacity: '5000 mAh',
      weight: '350g'
    },
    image: '/images/accessories/battery-plus.png',
    featured: true
  },
  {
    id: 'acc-prop-02',
    name: 'Carbon Fiber Propellers (Set of 4)',
    category: 'Safety',
    compatibility: ['dt-01-titan'],
    price: 85.00,
    stock: 120,
    specs: {
      material: 'Carbon Fiber',
      weight: '45g per blade'
    },
    image: '/images/accessories/propellers-cf.png'
  },
  {
    id: 'acc-sd-03',
    name: 'Pro-V60 SD Card 256GB',
    category: 'Storage',
    compatibility: ['dt-03-cine', 'dt-02-agri'],
    price: 95.00,
    stock: 80,
    specs: {
      capacity: '256GB',
      material: 'UHS-II Speed Class'
    },
    image: '/images/accessories/sd-card.png'
  },
  {
    id: 'acc-case-04',
    name: 'Hard Shell Transport Case',
    category: 'Safety',
    compatibility: ['dt-01-titan', 'dt-02-agri', 'dt-03-cine'],
    price: 210.00,
    stock: 15,
    specs: {
      material: 'Reinforced Polymer',
      weight: '2.5kg'
    },
    image: '/images/accessories/hard-case.png',
    featured: true
  },
  {
    id: 'acc-filter-05',
    name: 'ND Filter Set (ND8/16/32/64)',
    category: 'Optics',
    compatibility: ['dt-03-cine'],
    price: 120.00,
    stock: 30,
    specs: {
      material: 'Multi-coated Glass'
    },
    image: '/images/accessories/nd-filters.png'
  }
];

/**
 * Helper para filtrar accesorios por compatibilidad con un modelo de drone específico
 */
export const getAccessoriesByDrone = (droneId: string): Accessory[] => {
  return DRONE_ACCESSORIES.filter(acc => acc.compatibility.includes(droneId));
};

/**
 * Estilos dinámicos basados en la identidad visual de Drone DT (#FFD700)
 */
export const accessoryStyles = {
  badge: "bg-[#FFD700] text-black font-bold px-2 py-1 rounded-md text-xs",
  cardBorder: "border-l-4 border-[#FEB60D] hover:shadow-lg transition-all",
  priceTag: "text-[#000000] font-extrabold text-lg"
};