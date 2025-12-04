import Image from "next/image";

const HeroSmall = ({ title }: { title: string }) => {
  return (
    <section className='relative w-full h-20 md:h-[272px]'>
      <Image
        src='/bg/footerbg.jpg'
        alt='Hero Background. Animated people with hands up.'
        width={1440}
        height={272}
        className='object-cover w-full md:h-[272px] brightness-15'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center z-1'>
        <h1 className='text-white text-4xl uppercase'>{title}</h1>
        <Image src='/bottom_line2.png' alt='Title underline pink' width={400} height={10} className='mt-2' />
      </div>
    </section>
  );
};

export default HeroSmall;
