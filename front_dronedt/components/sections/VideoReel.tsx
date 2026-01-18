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


export default DroneReel;