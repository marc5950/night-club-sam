import { getTestimonials } from "@/app/lib/api";
import Testimonial from "./Testimonial";

const testimonialList = async () => {
  const testimonialData = await getTestimonials();
  return (
    <section className='max-w-6xl mx-auto p-8 mt-20'>
      {testimonialData.map((post) => (
        <Testimonial key={post.id} post={post} />
      ))}
    </section>
  );
};

export default testimonialList;
