import { useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";

const LoginRegisterDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Chiudi il menu se clicchi fuori
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

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full bg-pri px-4 py-2 rounded-md text-white border border-white cursor-pointer hover:bg-acc transition duration-300"
      >
        Accedi / Registrati
      </button>

      {open && (
        <ul className="absolute z-30 mt-2 w-full bg-white text-black rounded-md shadow-lg">
          <li
            onClick={() => handleNavigation("/login")}
            className="px-4 py-2 cursor-pointer hover:bg-[#7209B7] hover:text-white transition"
          >
            Accedi
          </li>
          <li
            onClick={() => handleNavigation("/register")}
            className="px-4 py-2 cursor-pointer hover:bg-[#7209B7] hover:text-white transition"
          >
            Registrati
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoginRegisterDropdown;
