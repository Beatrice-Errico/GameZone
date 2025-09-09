import { useLoaderData } from "react-router";
import CardGame from "../components/CardGame";

export default function SearchPage() {
  const { games, query } = useLoaderData();

  return (
    <main className="pt-20 px-8 bg-pri min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">
        Risultati per: <span className="italic">"{query}"</span>
      </h1>

      {games.length === 0 ? (
        <p>Nessun gioco trovato.</p>
      ) : (
        <section className="cards-columns columns-1 sm:columns-2 lg:columns-3 gap-4">
          {games.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
        </section>
      )}
    </main>
  );
}
