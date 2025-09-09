import { useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";

const YearDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Chiudi dropdown se clicco fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleYearClick = (year) => {
    navigate(`/year/${year}`);
    setOpen(false);
  };

  // Anni dal 2025 al 2000
  const years = Array.from({ length: 26 }, (_, i) => 2025 - i);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
          className="text-white w-full cursor-pointer px-4 py-2 rounded-md bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
        
      >
        Filtra per Anno di rilascio
      </button>

      {open && (
        <ul className="absolute z-30 mt-2 max-h-60 overflow-y-auto w-full bg-white text-black rounded-md shadow-lg">
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleYearClick(year)}
              className="px-4 py-2 cursor-pointer hover:bg-pri/80 hover:text-white transition"
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearDropdown;
