import { NextResponse } from 'next/server';

export async function GET() {
  // Datos temporales para visualizar el grid L5
  const mockData = Array.from({ length: 12 }).map((_, i) => ({
    id: `EM-${1000 + i}`,
    status: i % 3 === 0 ? 'READY' : 'STORED',
    lastSync: new Date()
  }));

  return NextResponse.json(mockData);
}