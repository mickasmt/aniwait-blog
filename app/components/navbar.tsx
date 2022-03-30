import { Link, NavLink } from "remix"
import { Logo } from "./logo"
import { ButtonDarkMode } from "./button-dark-mode"
import { useOptionalUser } from "~/utils";

const LINKS = [
  { name: 'Accueil', to: '/' },
  { name: 'Planning', to: '/planning' },
  { name: 'Actus', to: '/news' }
]

function Navbar() {
  const user = useOptionalUser();

  return (
    <header className="flex h-14 border-b border-gray-200 sticky top-0 backdrop-blur-md z-50 text-black bg-white/80 dark:bg-gray-900/90 dark:border-gray-800 dark:text-gray-100 dark:backdrop-blur-xl">
      <div className="flex flex-row w-full h-full justify-between items-center f-container">
        <Logo />

        <div className="hidden space-x-10 md:flex">

          {LINKS.map(link => (
            <NavLink
              to={link.to}
              key={link.to}
              className={({ isActive }) => isActive ? 'text-blue-tron relative underbar-active' : 'relative underbar'}
              prefetch="render"
            >
              <span>{link.name}</span>
            </NavLink>
          ))}

        </div>
        <div className="flex space-x-3">
          {user ? (
            <NavLink
              to="/profil"
              className={({ isActive }) => isActive ? 'text-blue-tron relative underbar-active' : 'relative underbar'}
              prefetch="render"
            >
              <span>Compte</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? 'text-blue-tron relative underbar-active' : 'relative underbar'}
              prefetch="render"
            >
              <span>Connexion</span>
            </NavLink>
          )}
          <ButtonDarkMode />
        </div>
      </div>
    </header>
  )
}

export { Navbar }