// src/features/drones/data/specs.ts

export interface DroneSpec {
  id: string;
  model: string;
  category: 'Industrial' | 'Professional' | 'Agricultural';
  price: number;
  specs: {
    flightTime: string; // Ej: "30 min"
    range: string;      // Ej: "10 km"
    payload: string;    // Capacidad de carga
    camera?: string;    // Opcional según el modelo
    topSpeed: string;
  };
  features: string[];
  status: 'Available' | 'In Maintenance' | 'In Use';
  image: string;
}

export const DRONE_SPECS: DroneSpec[] = [
  {
    id: 'dt-01-titan',
    model: 'Titan Explorer v1',
    category: 'Industrial',
    price: 2500,
    specs: {
      flightTime: '45 min',
      range: '15 km',
      payload: '5 kg',
      camera: '4K Thermal Vision',
      topSpeed: '72 km/h'
    },
    features: [
      'Obstacle Avoidance 360°',
      'IP54 Water Resistance',
      'RTK Precision Positioning'
    ],
    status: 'Available',
    image: '/images/drones/titan-explorer.png'
  },
  {
    id: 'dt-02-agri',
    model: 'AgroGuard S10',
    category: 'Agricultural',
    price: 3800,
    specs: {
      flightTime: '25 min',
      range: '5 km',
      payload: '10 kg (Liquid)',
      topSpeed: '40 km/h'
    },
    features: [
      'Precision Spraying System',
      'Terrain Follow Technology',
      'Automated Path Planning'
    ],
    status: 'Available',
    image: '/images/drones/agro-guard.png'
  },
  {
    id: 'dt-03-cine',
    model: 'CineMaster Pro',
    category: 'Professional',
    price: 1900,
    specs: {
      flightTime: '31 min',
      range: '12 km',
      payload: '1.2 kg',
      camera: '8K Ultra HD / ProRes',
      topSpeed: '90 km/h'
    },
    features: [
      '3-Axis Gimbal Stabilization',
      'MasterShots AI',
      'OcuSync 4.0 Transmission'
    ],
    status: 'Available',
    image: '/images/drones/cinemaster.png'
  }
];

/**
 * Helper para obtener colores según categoría 
 * alineado con el estilo Software DT
 */
export const getCategoryColor = (category: DroneSpec['category']) => {
  switch (category) {
    case 'Industrial': return '#FFD700'; // Gold
    case 'Agricultural': return '#FEB60D'; // YellowColor
    case 'Professional': return '#000000'; // HeadingColor
    default: return '#DCDCDC'; // Gainsboro
  }
};