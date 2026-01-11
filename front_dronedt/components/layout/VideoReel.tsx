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






          <div className="mt-6  space-x-4 pb-4 sm:hidden">
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