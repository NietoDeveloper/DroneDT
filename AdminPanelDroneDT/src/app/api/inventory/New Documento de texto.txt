import { NextResponse } from 'next/server';

// Definición de la estructura de datos del Activo (Esmeralda/Unidad)
interface InventoryAsset {
  id: string;
  sku: string;
  status: 'READY' | 'STORED' | 'TRANSIT';
  lastSync: string;
  integrity: number;
}

/**
 * L5_CORE_INVENTORY_HANDLER
 * Estado: MOCK_PRODUCTION_READY
 */
export async function GET() {
  try {
    // Generación de datos optimizada (simulando carga de 60 unidades para el grid 1900px)
    const mockData: InventoryAsset[] = Array.from({ length: 60 }).map((_, i) => ({
      id: `INTERNAL_ID_${1000 + i}`,
      sku: `EM-${2000 + i}`,
      status: i % 4 === 0 ? 'READY' : i % 7 === 0 ? 'TRANSIT' : 'STORED',
      lastSync: new Date().toISOString(),
      integrity: Math.floor(Math.random() * (100 - 95 + 1) + 95), // Simulación de salud del activo
    }));

    // Retorno con Headers de Seguridad y Control de Caché
    return NextResponse.json(mockData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0, must-revalidate', // Datos siempre frescos
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      },
    });

  } catch (error) {
    // Logger de sistema para fallos de sincronización L5
    console.error('L5_SYNC_CRITICAL_ERROR:', error);
    
    return NextResponse.json(
      { error: 'INTERNAL_SYNC_FAILURE', message: 'Fallo en la recuperación de activos' },
      { status: 500 }
    );
  }
}