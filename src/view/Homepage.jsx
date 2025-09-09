import { useLoaderData } from "react-router";
import { useEffect, useState, useRef, useContext } from "react";
import CardGame from "../components/CardGame";
import Header from "../components/Header";
import GenreDropdown from "../components/Filters/GenreDropdown";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SessionContext from "../context/SessionContext";
import Chatbox from "../components/Chatbox";

export default function Homepage() {
  const games = useLoaderData();
  const { user } = useContext(SessionContext);  // prendi user da context
  const userId = user?.id;

  const [showDropdown, setShowDropdown] = useState(false);
  const [canAnimateCards, setCanAnimateCards] = useState(false);
  const cardsRef = useRef(null);
  const isFirstRender = useRef(true);

  // PAGINAZIONE
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  const paginatedGames = games.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const latestGame =
    games.length > 0
      ? games.reduce((latest, current) =>
          new Date(current.released).getTime() >
          new Date(latest.released).getTime()
            ? current
            : latest
        )
      : null;

  useEffect(() => {
    const onScroll = () => {
      setShowDropdown(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCanAnimateCards(true);
      return;
    }

    setCanAnimateCards(false);
    setTimeout(() => {
      cardsRef.current?.scrollIntoView({ behavior: "auto" });
      setTimeout(() => setCanAnimateCards(true), 100);
    }, 50);
  }, [currentPage]);

  return (
    <main className="relative bg-pri/90 min-h-screen text-white">
      {latestGame && <Header game={latestGame} />}

      <div className="flex">
        {showDropdown && (
          <aside className="w-64 sticky top-20 h-screen p-4 bg-pri text-black z-20 shadow-lg">
            <GenreDropdown />
          </aside>
        )}

        <section className="flex-1 px-20 pl-1 pr-1 ">
          <article className="col-12 text-center h-60">
            <h1 className="text-3xl font-bold my-6  text-[#4E2BAD]">
              I nostri post
            </h1>
          </article>

          <div ref={cardsRef} />

          <section className="cards-columns columns-1 sm:columns-2 lg:columns-2 gap-4">
            {paginatedGames.map((game) => (
              <CardGame
                key={game.id}
                game={game}
                enableAnimations={canAnimateCards}
                userId={user?.id}   // passo userId a CardGame
              />
            ))}
          </section>

          <div className="flex justify-center items-center gap-6 p-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full cursor-pointer bg-transparent border border-white hover:bg-white/10 transition disabled:opacity-30"
              title="Pagina successiva"
            >
              <FiChevronRight size={24} className="text-white" />
            </button>
          </div>

              

        </section>
      </div>
    </main>
  );
}
