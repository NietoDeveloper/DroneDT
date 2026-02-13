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
    id: 'rd-01',
    title: 'AI Swarm Intelligence',
    phase: 'Testing',
    description: 'Algoritmos de coordinación para flotas de drones autónomos operando en enjambre para búsqueda y rescate.',
    techStack: ['Python', 'TensorFlow', 'ROS 2'],
    impact: 'Reducción del 40% en tiempo de cobertura de área.'
  },
  {
    id: 'rd-02',
    title: 'Hydrogen Power Cells',
    phase: 'Prototype',
    description: 'Integración de celdas de hidrógeno para extender la autonomía de vuelo hasta las 4 horas continuas.',
    techStack: ['Hardware Engineering', 'BMS Tech'],
    impact: 'Vuelos de larga distancia sin recarga.'
  },
  {
    id: 'rd-03',
    title: 'Edge Computing Analytics',
    phase: 'In Development',
    description: 'Procesamiento de imágenes térmicas directamente en el drone para detección de anomalías en tiempo real.',
    techStack: ['NVIDIA Jetson', 'Next.js', 'WebSockets'],
    impact: 'Alertas instantáneas sin dependencia de la nube.'
  }
];

export const ResearchPage = () => {
  return (
    <main className="min-h-screen bg-[#DCDCDC] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header de Investigación */}
        <div className="mb-16 border-l-8 border-[#FFD700] pl-8">
          <h1 className="text-5xl md:text-7xl font-black text-[#000000] uppercase tracking-tighter">
            R&D <br />
            <span className="text-[#FEB60D]">CENTER</span>
          </h1>
          <p className="mt-4 text-gray-600 font-mono text-sm max-w-xl">
            // INVESTIGACIÓN Y DESARROLLO DE DRONE DT. <br />
            EXPLORANDO LOS LÍMITES DE LA AUTONOMÍA AÉREA.
          </p>
        </div>

        {/* Grid de Proyectos de Investigación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="bg-white p-8 border border-gray-200 hover:border-[#FFD700] transition-colors relative group overflow-hidden"
            >
              {/* Indicador de Fase */}
              <div className="absolute top-0 right-0 bg-[#000000] text-[#FFD700] px-4 py-1 text-[10px] font-black uppercase">
                {project.phase}
              </div>

              <h2 className="text-2xl font-black text-[#000000] mb-4 group-hover:text-[#FEB60D] transition-colors">
                {project.title}
              </h2>
              
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Impacto Directo</h4>
                  <p className="text-sm font-bold text-[#000000]">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="bg-[#DCDCDC] text-[9px] font-bold px-2 py-1 rounded-sm uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Innovación Estilo Software DT */}
        <div className="mt-16 bg-[#000000] p-12 text-center text-white">
          <h3 className="text-3xl font-black mb-4 uppercase">¿Tienes un reto de ingeniería?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de desarrollo está listo para crear soluciones personalizadas. Desde software de control hasta integración de sensores específicos.
          </p>
          <button className="bg-[#FFD700] hover:bg-white text-black font-black px-8 py-3 transition-colors uppercase text-sm tracking-widest">
            Colaborar con I+D
          </button>
        </div>
      </div>
    </main>
  );
};