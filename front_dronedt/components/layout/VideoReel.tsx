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

  // Simulación de fetch de videos desde API (máximo, digamos, 10 videos para un reel)
  useEffect(() => {
    // En producción, reemplaza con fetch real a tu API en Express/Mongo
    const dummyVideos = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Drone Flight ${index + 1}`,
      videoUrl: `https://example.com/drone-video-${index + 1}.mp4`, // Placeholder para URLs de videos
      thumbnail: `https://via.placeholder.com/300x169?text=Drone+Video+${index + 1}`, // Thumbnail placeholder
      description: 'Impresionantes imágenes de drones en vuelo.',
    }));
    setVideos(dummyVideos);
  }, []);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 max-w-[1900px] min-w-[310px]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 md:text-4xl lg:text-5xl">
          Reel de Drones en Vuelo
        </h2>
        <div className="relative flex flex-col items-center">
          {/* Contenedor del video actual */}
          <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            {videos.length > 0 && (
              <video
                src={videos[currentVideo].videoUrl}
                poster={videos[currentVideo].thumbnail}
                controls


            {videos[currentVideo]?.rrentVideo]?.description}
          </p>
              cla-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Siguiente
            </button>
          </div>

          {/* Miniaturas para scroll horizontal en móviles */}
          <div className="mt-6 w-full overflow-x-auto flex space-x-4 pb-4 sm:hidden">
            {videos.map((video, index) => (
              <img
                key={video.id}
                src={video.thumbnail}
                alt={video.title}

            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneReel;