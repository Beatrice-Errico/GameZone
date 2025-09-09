import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router";
import { FiSearch } from "react-icons/fi"; // 👈 Import icona

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({
        pathname: "/search",
        search: createSearchParams({ query }).toString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un gioco..."
        className="px-4 py-2 rounded-md border border-white text-white bg-transparent font-semibold text-base placeholder-white focus:outline-none focus:ring-2 focus:ring-[#7209B7] transition duration-300"
      />
      <button
        type="submit"
        className="bg-pri hover:bg-sec text-white px-4 py-2 rounded-md transition duration-300 flex items-center justify-center cursor-pointer"
      >
        <FiSearch size={20} /> {/* 👈 Icona al posto del testo */}
      </button>
    </form>
  );
}
