import { Link } from "remix"
import { Logo } from "./logo"

function Footer() {
  return (
    <footer className="pt-10 pb-14 border-t border-gray-200 bg-white text-slate-700 md:pb-2 dark:bg-[#1A1A1A] dark:border-[#2A2A2A] dark:text-slate-500">
      <div className="f-container w-full">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo />
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm">Aniwait est un blog francophone centré sur l'actualité animes. Ne manquez plus les derniers trailers et retrouvez des articles en fonction de vos envies.</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-bold text-black dark:text-white">
              Liens
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/">Accueil</Link>
              <Link to="/planning">Planning</Link>
              <Link to="/news">Actus</Link>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-bold text-black dark:text-white">
              Social
            </span>
            {/* <div className="flex items-center mt-1 space-x-3">Link</div> */}
            <p className="mt-1 text-sm text-gray-500">
              {/* Retrouvez nous sur les réseaux ! */}
              Retrouvez "bientôt" nous sur les réseaux !
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between py-5 border-t border-gray-200 lg:flex-row dark:border-gray-800">
          <p className="text-sm">
            © Copyright 2022 &nbsp;—&nbsp; Aniwait. Tout droits réservés.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <Link to="/" className="text-sm transition-colors duration-300 hover:text-custom-400">
                Mises à jour
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm transition-colors duration-300 hover:text-custom-400">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm transition-colors duration-300 hover:text-custom-400">
                Termes & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export { Footer }