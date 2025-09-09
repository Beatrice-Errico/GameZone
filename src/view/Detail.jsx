import { useLoaderData } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import Buttons4 from "../assets/Buttons4";
import Button2 from "../assets/Button2";
import ScreenshotModal from "../components/ScreenshotModal";

export default function Detail() {
  const { game, screenshots } = useLoaderData();
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: scrolled ? 0 : 1,
      maxHeight: scrolled ? 0 : "100vh",
      overflow: "hidden",
      transition: { duration: 0.5, ease: "easeInOut" },
      pointerEvents: scrolled ? "none" : "auto",
    });
  }, [scrolled, controls]);

  return (
    <>
      {/* Header Hero */}
      <motion.header
        animate={controls}
        initial={{ opacity: 1, maxHeight: "100vh" }}
        className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${game.background_image}')` }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="fixed top-70 left-6 z-30">
              <Chatbox data={game} />
            </div>

        <div className="relative z-10 text-center px-4 w-1/3 text-left mx-auto">
          <p className="uppercase text-sm sm:text-base tracking-widest font-semibold mb-4 text-acc">
            Ultima Uscita
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-md">
            {game.name}
          </h1>
          <p className="mt-3 text-white/80 text-sm sm:text-lg">
            Uscito il {game.released?.split("-").reverse().join("/")}
          </p>
          <div className="flex justify-center items-center gap-4 mt-16">
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="p-3 rounded-full bg-acc text-white shadow-lg cursor-pointer"
            >
              Immagini gioco ➤
            </motion.button>
            <Buttons4>Acquista </Buttons4>
          </div>
        </div>

        <div
          className="absolute right-0 top-0 bottom-0 w-2/3 bg-cover bg-center"
          style={{ backgroundImage: `url('${game.background_image}')` }}
        />
      </motion.header>

      {/* Descrizione e Dati */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-800 mt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-sec mb-6">Descrizione</h2>
          <p className="text-base leading-relaxed mb-10 text-gray-700">
            {game.description_raw}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold text-pri mb-2">Genere</h3>
              <div className="flex flex-wrap gap-2">
                {game.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-sec/10 text-sec px-3 py-1 rounded-full font-medium text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-pri mb-2">Piattaforme</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map((p) => (
                  <span
                    key={p.platform.id}
                    className="bg-pri/10 text-pri px-3 py-1 rounded-full font-medium text-sm"
                  >
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-pri mb-2">Rating</h3>
              <p>
                {game.rating} / 5 ({game.ratings_count} voti)
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-pri mb-2">Sito ufficiale</h3>
              {game.website ? (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-acc underline"
                >
                  {game.website}
                </a>
              ) : (
                <p>Non disponibile</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottoni acquisto + slider trigger */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="p-3 rounded-full bg-acc text-white shadow-lg cursor-pointer"
          >
            Immagini gioco ➤
          </motion.button>
          <Button2>Acquista</Button2>
        </div>
      </section>

      {/* Screenshot Modal */}
      <ScreenshotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        screenshots={screenshots}
      />
    </>
  );
}
