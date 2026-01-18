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

const Features: FC<FeaturesProps> = ({ title, features }) => {
  return (

  );
};

export default Features;