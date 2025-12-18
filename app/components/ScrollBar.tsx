"use client";
interface ScrollBarProps {
  count?: number; // Antal prikker der skal vises
  active: number; // Hvilken prik der er aktiv, altså den der er valgt
  onSelect: (id: number) => void; // Funktion der viser hvilken prik der er valgt, som så defineres i parent komponentet
  activeColor: string; // Farve for aktiv prik
  color: string; // Farve for inaktive prikker
}

const ScrollBar = ({ count = 3, active, onSelect, activeColor, color }: ScrollBarProps) => (
  <div className='flex justify-center gap-4'>
    {/* Prikker laves dynamisk baseret på count prop */}
    {Array.from({ length: count }).map((_, id) => (
      <button
        key={id} // Hver prik får et unikt key baseret på dens id
        onClick={() => onSelect(id)} // Når der klikkes på en prik, kaldes funktionen onSelect med prikens id
        className={`w-5 h-5  ${active === id ? activeColor : color}`} // Hvis prikken er aktiv, bruges activeColor, ellers color
        aria-label={`Gå til element ${id + 1}`} // Viser hvilken prik der er valgt for skærmlæsere
      />
    ))}
  </div>
);

export default ScrollBar;
