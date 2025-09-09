import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoriteContext";

export default function CardGame({ game, enableAnimations = true }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites();

  useEffect(() => {
    if (inView && enableAnimations) {
      controls.start("visible");
    }
  }, [controls, inView, enableAnimations]);

  const handleFavoriteAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFavorite(game.id)) {
      await addFavorite(game);
    }
  };

  const handleFavoriteRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(game.id)) {
      await removeFavorite(game.id);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Link to={`/detail/${game.id}/${game.slug || ""}`} className="block">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={enableAnimations ? controls : "visible"}
        variants={variants}
        className="w-full rounded-xl overflow-hidden shadow-md bg-black text-white mb-6 break-inside-avoid transition-transform duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:rotateX-[8deg]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full object-cover"
        />

        <div className="p-2 space-y-1 text-xs sm:text-sm md:text-base">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <h3 className="font-bold truncate leading-tight text-[10px] sm:text-sm md:text-base">
              {game.name}
            </h3>
            <span className="text-[10px] sm:text-xs md:text-sm text-white/70">
              {game.released?.split("-").reverse().join("/")}
            </span>
          </div>

          <div className="relative no-scrollbar flex items-center space-x-2">
            <div className="flex overflow-x-auto scrollbar-hide space-x-2 pr-4 flex-1">
              {game.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm px-2 py-0.5 rounded-full border border-white/40 bg-white/10"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* ❤️ Cuore preferito */}
            {isFavorite(game.id) ? (
              <button
                type="button"
                onClick={handleFavoriteRemove}
                disabled={loading}
                aria-label="Rimuovi dai preferiti"
                className="text-red-600 hover:text-red-800 focus:outline-none transition cursor-pointer"
              >
                <Heart size={20} fill="red" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFavoriteAdd}
                disabled={loading}
                aria-label="Aggiungi ai preferiti"
                className="text-red-600 hover:text-red-800 focus:outline-none transition cursor-pointer"
              >
                <Heart size={20} />
              </button>
            )}

            <div className="flex items-center bg-gradient-to-l from-white/10 pl-1">
              <span className="text-white text-sm">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
