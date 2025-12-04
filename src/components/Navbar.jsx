import { Link } from "react-router";
import Button from "../assets/Button";
import Searchbar from "../components/Searchbar";

export default function Navbar() {
  return (
    <nav className="bg-pri text-black fixed w-full z-20 top-0 start-0 shadow-lg h-[100px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4">
        {/* LOGO / TITOLO */}
        <Link to="/">
            <h1
    style={{ fontFamily: "Orbitron, system-ui, sans-serif" }}
    className="
      text-white
      font-semibold
      uppercase
      leading-none
      tracking-[0.2em]
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-6xl
      whitespace-nowrap
      drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]
    "
  >
    GameZone
  </h1>
        </Link>

        {/* MENU / SEARCHBAR */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 font-medium">
            <li>
              <Searchbar />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
