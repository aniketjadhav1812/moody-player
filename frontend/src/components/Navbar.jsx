import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass =
    "relative px-3 py-1 font-medium transition-colors duration-200 hover:text-purple-300";
  const activeClass =
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="navbar fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 bg-zinc-900 text-white shadow-md z-50">
      <h1 className="logo font-bold text-2xl">
        <span className="text-purple-300 italic">Moody_</span>Player
      </h1>

      <div className="flex space-x-6">
        <NavLink
          to="/moody-songs"
          className={({ isActive }) =>
            `${linkClass} ${activeClass} ${isActive ? "after:w-full" : ""}`
          }
        >
          Moody Songs
        </NavLink>
        <NavLink
          to="/all-songs"
          className={({ isActive }) =>
            `${linkClass} ${activeClass} ${isActive ? "after:w-full" : ""}`
          }
        >
          All Songs
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
