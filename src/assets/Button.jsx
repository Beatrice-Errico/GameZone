import { FaShoppingCart } from "react-icons/fa";

export default function Button({ children }) {
  return (
    <button
      
      className="bg-sec hover:bg-pri text-white font-semibold px-6 py-2 border-2 border-acc flex items-center space-x-2 transition duration-300 cursor-pointer"
    >
      <FaShoppingCart />
      <span>{children || "Acquista"}</span>
    </button>
  );
}
