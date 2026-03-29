// src/app/shop/ResearchPage.tsx
import React from 'react';

interface ResearchProject {
  id: string;
  title: string;
  phase: 'In Development' | 'Testing' | 'Prototype';
  description: string;
  techStack: string[];
  impact: string;
}

const PROJECTS: ResearchProject[] = [

  {
    id: 'rd-02',
    title: 'Hydrogen Power Cells',
    phase: 'Prototype',
    description: 'Integración de celdas de hidrógeno para extender la autonomía de vuelo hasta las 4 horas continuas.',
    techStack: ['Hardware Engineering', 'BMS Tech'],
    impact: 'Vuelos de larga distancia sin recarga.'
  },
