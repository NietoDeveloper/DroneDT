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

        ))}
      </div>
    </section>
  );
};

export default Testimonials;