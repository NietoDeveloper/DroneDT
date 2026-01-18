import { FC } from 'react';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface FeaturesProps {
  title: string;
  features: Feature[];
}


export default Features;