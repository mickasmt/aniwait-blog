import { Link } from "remix";

function CategoriesNavbar() {
  return (
    <div className="flex h-10 border-b border-gray-200 sticky top-14 backdrop-blur-md z-50 text-black bg-white/80 dark:bg-dark dark:border-gray-800/80 dark:text-slate-100 dark:backdrop-blur-md">
      <div className="f-container flex space-x-7 text-sm justify-center items-center align-middle">
        <Link to="/news">Dernières actus</Link>
        <Link to="/news/animes">Animes</Link>
        <Link to="/news/trailers">Trailers</Link>
      </div>
    </div>
  )
}

export { CategoriesNavbar }