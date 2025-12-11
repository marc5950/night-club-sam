"use client";
import Image from "next/image";
import { Event } from "@/app/types/api";

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
    <article className='relative mb-9'>
      <Image src={event.asset.url} alt={event.title} width={600} height={400} />
      <div className='flex absolute bottom-0 left-0  bg-secondary text-primary w-full gap-4 p-1 text-[20px]'>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
        <span className='ml-3'>{event.location}</span>
      </div>
    </article>
  );
};

export default EventCard;
