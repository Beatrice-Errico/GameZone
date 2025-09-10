import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router";
import PlatformDropdown from "./PlatformDropdown";
import YearDropdown from "./YearDropdown";
import LoginRegisterDropdown from "../LoginRegisterDropDown";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";

const GenreDropdown = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    fetch("https://api.rawg.io/api/genres?key=d19b80a79f394d64af19909b291d6308")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.results);
      });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleGenreClick = (slug) => {
    window.location.href = `/games/${slug}`;
  };

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className=" relative w-full mt-20 flex flex-col gap-4" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="text-white font-dejavu w-full cursor-pointer px-4 py-2 rounded-md bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
        >
          Filtra per Genere
        </button>

        {open && (
          <ul className="absolute z-30 mt-2 max-h-60 overflow-y-auto w-full bg-white text-black rounded-md shadow-lg">
            {genres.map((genre) => (
              <li
                key={genre.id}
                onClick={() => handleGenreClick(genre.slug)}
                className="px-4 py-2 cursor-pointer hover:bg-pri/80 hover:text-white"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <PlatformDropdown />
        </div>

        <div className="mt-4">
          <YearDropdown />
        </div>
      </div>

      {/* Bottoni in fondo */}
      <div className="mt-8 flex justify-end gap-2 items-center">
        {session ? (
          <>
            <Link to="/account" title="Profilo">
              <button className="cursor-pointer p-2 rounded-lg text-white border-2 border-[color:var(--color-acc)] hover:bg-[color:var(--color-acc)] transition">
                <FiUser size={18} />
              </button>
            </Link>

            <Link to="/cart" title="Carrello">
              <button className="cursor-pointer p-2 rounded-lg text-white border-2 border-[color:var(--color-acc)] hover:bg-[color:var(--color-acc)] transition">
                <FiShoppingCart size={18} />
              </button>
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="cursor-pointer p-2 rounded-lg text-white border-2 border-[color:var(--color-acc)] hover:bg-[color:var(--color-acc)] transition"
            >
              <FiLogOut size={18} />
            </button>
          </>
        ) : (
          <div className="text-sm">
            <LoginRegisterDropdown />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreDropdown;
