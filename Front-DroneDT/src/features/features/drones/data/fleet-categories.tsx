// src/features/drones/data/fleet-categories.ts

export type FleetCategorySlug = 'industrial' | 'agricultural' | 'professional' | 'emergency';

export interface FleetCategory {
  id: string;
  slug: FleetCategorySlug;
  title: string;
  description: string;
  icon: string; // Nombre del icono para Lucide-react o path SVG
  color: string;
  specialties: string[];
  capabilities: {
    maxPayload: string;
    avgAutonomy: string;
  };
}

export const FLEET_CATEGORIES: FleetCategory[] = [
  {
    id: 'cat-01',
    slug: 'industrial',
    title: 'Inspección Industrial',
    description: 'Drones de alta precisión para inspección de infraestructuras, energía y minería.',
    icon: 'HardHat',
    color: '#FFD700', // Gold de Software DT
    specialties: [
      'Termografía Infrarroja',
      'Mapeo LiDAR 3D',
      'Inspección de Torres Eléctricas',
      'Detección de Fugas de Gas'
    ],
    capabilities: {
      maxPayload: '8 kg',
      avgAutonomy: '45-55 min'
    }
  },
  {
    id: 'cat-02',
    slug: 'agricultural',
    title: 'Agricultura de Precisión',
    description: 'Optimización de cultivos mediante fumigación automatizada y análisis multiespectral.',
    icon: 'Sprout',
    color: '#FEB60D', // YellowColor de Software DT
    specialties: [
      'Fumigación de Cultivos',
      'Índice de Vegetación (NDVI)',
      'Conteo de Plantas AI',
      'Análisis de Suelos'
    ],
    capabilities: {
      maxPayload: '40 kg',
      avgAutonomy: '25-30 min'
    }
  },
  {
    id: 'cat-03',
    slug: 'professional',
    title: 'Producción Audiovisual',
    description: 'Captura cinematográfica de alta gama para cine, publicidad y eventos masivos.',
    icon: 'Camera',
    color: '#000000', // HeadingColor
    specialties: [
      'Grabación 8K RAW',
      'Transmisión en Vivo (Live Stream)',
      'Fotografía Aérea Publicitaria',
      'Carreras FPV Cinematográfico'
    ],
    capabilities: {
      maxPayload: '3 kg',
      avgAutonomy: '30-40 min'
    }
  },
  {
    id: 'cat-04',
    slug: 'emergency',
    title: 'Búsqueda y Rescate',
    description: 'Respuesta rápida en situaciones críticas, desastres naturales y vigilancia costera.',
    icon: 'Siren',
    color: '#DCDCDC', // Gainsboro
    specialties: [
      'Localización de Personas',
      'Monitoreo de Incendios',
      'Entrega de Suministros Médicos',
      'Vigilancia Nocturna'
    ],
    capabilities: {
      maxPayload: '12 kg',
      avgAutonomy: '50 min'
    }
  }
];

/**
 * Utility: Obtiene una categoría por su slug (útil para [slug]/page.tsx en Next.js)
 */
export const getCategoryBySlug = (slug: string): FleetCategory | undefined => {
  return FLEET_CATEGORIES.find(cat => cat.slug === slug);
};

/**
 * Utility: Lista todas las especialidades disponibles en la flota
 */
export const getAllSpecialties = (): string[] => {
  const all = FLEET_CATEGORIES.flatMap(cat => cat.specialties);
  return Array.from(new Set(all)); // Elimina duplicados
};