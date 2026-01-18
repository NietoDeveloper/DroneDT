import React, { useState, useEffect } from 'react';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

const DroneReel: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number>(0);

  useEffect(() => {
    const dummyVideos: Video[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Operación Drone ${index + 1}`,
      videoUrl: `https://example.com/drone-video-${index + 1}.mp4`,
      thumbnail: `https://via.placeholder.com/600x400?text=Vuelo+DT+${index + 1}`,
      description: 'Captura técnica de alto rendimiento en terreno.',
    }));
    setVideos(dummyVideos);
  }, []);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  return (
    <section className="py-16 bg-main">
      <div className="container mx-auto px-4 max-w-[1900px] min-w-[310px]">
        <h2 className="text-4xl font-black text-center mb-2 text-headingColor md:text-5xl uppercase tracking-tighter">
          REEL DE <span className="text-yellowColor">VUELO DT</span>
        </h2>
        <div className="w-24 h-1 bg-gold mx-auto mb-10"></div>

        <div className="relative flex flex-col items-center">
          {/* Contenedor del video principal con borde Gold */}
          <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gold shadow-gold/20">
            {videos.length > 0 && (

            )}
          </div>



          {/* Botones de Navegación Estilo DroneDT */}
          <div className="flex justify-between w-full max-w-4xl mt-8 absolute top-1/2 -translate-y-1/2 px-4 pointer-events-none">
            <button
              onClick={prevVideo}
              className="pointer-events-auto bg-headingColor/80 hover:bg-yellowColor text-gold hover:text-headingColor p-4 rounded-full transition duration-300 backdrop-blur-sm shadow-lg group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
           
          </div>

          {/* Grid de Miniaturas con Indicador de Selección */}
          <div className="mt-12 w-full overflow-x-auto flex space-x-4 pb-4 no-scrollbar">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                onClick={() => setCurrentVideo(index)}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border-2 
                  ${index === currentVideo ? 'border-yellowColor scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-32 h-20 object-cover sm:w-48 sm:h-28"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneReel;