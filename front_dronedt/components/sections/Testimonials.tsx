import { FC } from 'react';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

const Testimonials: FC<TestimonialsProps> = ({ title, testimonials }) => {
  return (
    <section className="py-20 bg-white px-4">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-tighter">{title}</h2>
      <div className="max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-main p-8 rounded-2xl border-l-4 border-yellowColor italic text-lg text-headingColor">
            "{t.text}"
            <div className="mt-4 not-italic font-bold text-sm">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;