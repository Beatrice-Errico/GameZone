import { Link } from "react-router";
import Button from "../assets/Button";
import Searchbar from "../components/Searchbar";



export default function Navbar() {
  return (
    <nav className="bg-pri text-black fixed w-full z-20 top-0 start-0 shadow-lg h-[100px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-7">

        <Link to={"/"}>
        <div className="flex md:order-2 space-x-2">
        <span className="text-white text-2xl font-bold font-anton uppercase tracking-wide">GameZone</span>

        </div>
        </Link>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 font-medium">
            <li>
 
              <Searchbar />
            </li>
            <li>

            </li>

            <li>

              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
