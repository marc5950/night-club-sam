"use client"; // Slideren bruger hooks og browser events, derfor skal den være en client komponent

import * as React from "react"; // Import af React biblioteket
import * as SliderPrimitive from "@radix-ui/react-slider"; // Import af Slider komponenten fra Radix UI biblioteket

import { cn } from "@/lib/utils"; // Import af en hjælpefunktion til at kombinere classNames

// Funktion til Slider komponenten
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
// Funktionen modtager alle props som Slideren understøtter
// Der er givet nogle standardværdier for min og max og andre props sendes videre til SliderPrimitive.Root


// Opretter en konstat _values der indeholder de værdier slideren skal bruge
const _values = React.useMemo( // useMemo er en hook som husker en værdi, indtil den ændres
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]), // Sørger for at slideren altid arbejder med et array af værdier
    [value, defaultValue, min, max]
  ); // Det gør slideren fleksibel og genbrugelig

  return (
    <SliderPrimitive.Root // Sliderens container (rod)
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}>
      <SliderPrimitive.Track // Den pinke linje der viser sliderens fulde bane
        data-slot="slider-track"
        className={cn(
          "bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}>
        <SliderPrimitive.Range // Den hvide del af linjen der hvor langt hen slideren er
          data-slot="slider-range"
          className={cn("bg-white absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")}
        />
      </SliderPrimitive.Track> 
      {Array.from({ length: _values.length }, (_, index) => ( // Renderer en thumb for hver værdi i slideren
        <SliderPrimitive.Thumb // Cirklen der bruges til at trække slideren
          data-slot="slider-thumb"
          key={index} // Holder styr på hver thumb med en unik key
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
