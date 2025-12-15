"use client";
import Image from "next/image";
import { Event } from "@/app/types/api";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const d = new Date(event.date);

  const formattedDate = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.article
      className='relative mb-15'
      whileHover='hover' // Hover tilstand
      initial='rest' // Starttilstand
      animate='rest' // Normal tilstand
    >
      <div className='relative'>
        <Image src={event.asset.url} alt={event.title} width={600} height={400} />
        <motion.div
          className='absolute inset-0 bg-black'
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.5 },
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.button
          className='absolute left-1/2 -translate-x-1/2 top-25 bg-secondary text-white p-2'
          variants={{
            rest: { opacity: 0, y: -30 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          Book Now
        </motion.button>
        <motion.div
          className='absolute left-0 bottom-0 bg-black p-3  flex flex-col items-start gap-1 text-primary'
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          <div className='text-primary text-title3'>{event.title}</div>
          <div className='text-primary text-p-small line-clamp-3'>{event.description}</div>
        </motion.div>
      </div>
      <div className='flex absolute bg-secondary text-primary w-full gap-4 p-1 text-p-big'>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
        <span className='ml-3'>{event.location}</span>
      </div>
    </motion.article>
  );
};

export default EventCard;
