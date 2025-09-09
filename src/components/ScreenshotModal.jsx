import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ScreenshotModal({ isOpen, onClose, screenshots }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-5xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-xl"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Slide immagini */}
            <div className="w-full h-full relative">
              <img
                src={screenshots[currentSlide].image}
                alt="Screenshot"
                className="w-full h-full object-cover"
              />

              {/* Freccia sinistra */}
              <button
                onClick={handlePrev}
                className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black p-3 rounded-full"
              >
                ←
              </button>

              {/* Freccia destra */}
              <button
                onClick={handleNext}
                className=" cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black p-3 rounded-full"
              >
                →
              </button>

              {/* Chiudi */}
              <button
                onClick={onClose}
                className="cursor-pointer absolute top-4 right-4 text-white bg-black/70 hover:bg-black p-2 rounded-full"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
