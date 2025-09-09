import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Buttons4 from "../assets/Buttons4";

export default function Header({ game }) {
  if (!game || !game.background_image) return null;

  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      controls.start({
        opacity: 0,
        maxHeight: 0,
        overflow: "hidden",
        transition: { duration: 0.5, ease: "easeInOut" },
        pointerEvents: "none",
      });
    } else {
      controls.start({
        opacity: 1,
        maxHeight: "100vh",
        overflow: "hidden",
        transition: { duration: 0.5, ease: "easeInOut" },
        pointerEvents: "auto",
      });
    }
  }, [scrolled, controls]);

  return (
    <motion.header
      animate={controls}
      initial={{ opacity: 1, maxHeight: "100vh" }}
      className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background con zoom lento */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${game.background_image}')` }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Contenuto */}
      <div className="relative z-10 text-center px-4 w-1/3 text-left">
        <p className="uppercase text-sm sm:text-base tracking-widest font-semibold mb-4 text-acc">
          Ultima Uscita
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-md">
          {game.name}
        </h1>
        <p className="mt-3 text-white/80 text-sm sm:text-lg mb-10">
          Uscito il {game.released?.split("-").reverse().join("/")}
        </p>
        < Buttons4>Acquista</Buttons4>
      </div>

      {/* Foto a destra */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2/3 bg-cover bg-center"
        style={{ backgroundImage: `url('${game.background_image}')` }}
      />
    </motion.header>
  );
}
