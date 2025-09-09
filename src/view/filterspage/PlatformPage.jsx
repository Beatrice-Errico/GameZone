import { useLoaderData } from "react-router";
import CardGame from "../../components/CardGame";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function PlatformPage() {

  
  const { games, platformId,} = useLoaderData();
   const platformNames = {
    4: "PC",
    18: "PlayStation 4",
    187: "PlayStation 5",
    1: "Xbox One",
    186: "Xbox Series S/X",
    7: "Nintendo Switch",
    3: "iOS",
    21: "Android",
    5: "macOS",
    // aggiungi altri se ti servono
  };

  const platformName = platformNames[platformId] || "Piattaforma sconosciuta";

  // PAGINAZIONE
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  const paginatedGames = games.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="pt-20 px-8 bg-pri min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-20 mt-20 text-center">Giochi disponibili per {platformName}</h1>
      {games.length === 0 ? (
        <p>Nessun gioco trovato.</p>
      ) : (
        <section className="cards-columns columns-1 sm:columns-2 lg:columns-3 gap-4">
          {paginatedGames.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
        </section>
      )}
      {/* CONTROLLI PAGINAZIONE CON FRECCE */}
      <div className="flex justify-center items-center gap-6  p-10">
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === 1}
          className="p-2 rounded-full cursor-pointer bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
          title="Pagina precedente"
        >
          <FiChevronLeft size={24} className="text-white" />
        </button>

        <span className="font-semibold text-white text-lg">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full cursor-pointer bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
          title="Pagina successiva"
        >
          <FiChevronRight size={24} className="text-white" />
        </button>
      </div>
    </main>
  );
}
