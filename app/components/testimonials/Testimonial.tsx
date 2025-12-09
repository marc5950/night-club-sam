"use client";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { Testimonial } from "@/app/types/api";

interface TestimonialProps {
  post: Testimonial;
}

const Testimonials = ({ post }: TestimonialProps) => {
  return (
    <section className='flex flex-col items-center justify-center py-12'>
      <Image src={post.asset.url} alt={post.name} width={210} height={210} className='object-cover' />
      <h3 className='text-title3 mt-6 mb-3 font-bold text-primary uppercase'>{post.name}</h3>
      <p className='mt-2 text-lg max-w-[70ch] text-center'>{post.content}</p>
      <div className='flex gap-5 mt-6'>
        <FaFacebookF className='border-2 text-primary text-4xl p-2 cursor-pointer' />
        <FaTwitter className='border-2 text-primary text-4xl p-2 cursor-pointer' />
        <FaSnapchatGhost className='border-2 text-primary text-4xl p-2 cursor-pointer' />
      </div>
    </section>
  );
};

export default Testimonials;
