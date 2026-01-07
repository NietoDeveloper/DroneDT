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
    <section className="py-20 bg-main px-4">
      <h2 className="text-4xl font-bold text-center mb-16 tracking-tighter">{title}</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="text-center p-6 bg-white rounded-3xl shadow-sm border border-gainsboro">
            <span className="text-5xl mb-6 block">{f.icon}</span>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-gray-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;