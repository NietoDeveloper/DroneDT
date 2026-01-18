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


            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneReel;