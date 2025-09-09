import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

const PlatformDropdown = () => {
  const [platforms, setPlatforms] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.rawg.io/api/platforms?key=d19b80a79f394d64af19909b291d6308")
      .then((res) => res.json())
      .then((data) => setPlatforms(data.results));
  }, []);

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

  const handlePlatformClick = (id) => {
    navigate(`/platform/${id}`); // esempio: /platform/4
    setOpen(false);
  };

  return (
    <div className="relative w-full mt-4" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
          className="text-white w-full cursor-pointer px-4 py-2 rounded-md bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
        
      >
        Filtra per Piattaforma
      </button>

      {open && (
        <ul className="absolute z-30 mt-2 max-h-60 overflow-y-auto w-full bg-white text-black rounded-md shadow-lg">
          {platforms.map((platform) => (
            <li
              key={platform.id}
              onClick={() => handlePlatformClick(platform.id)}
              className="px-4 py-2 cursor-pointer hover:bg-pri/80 hover:text-white"
            >
              {platform.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlatformDropdown;
