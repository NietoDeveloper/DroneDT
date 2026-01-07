import { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  videoSrc: string;
}

const Hero: FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-main overflow-hidden">
      {/* Placeholder para el video de fondo */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="relative z-20 text-center px-4 animate-tesla">
        <h1 className="text-5xl md:text-6xl font-bold text-headingColor tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-textColor mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <a href={ctaLink} className="bg-black text-white px-10 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;