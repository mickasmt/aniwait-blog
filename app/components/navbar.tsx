import { NavLink, Link } from "remix"
import { Logo } from "./logo"
import { ButtonDarkMode } from "./button-dark-mode"
import { useOptionalUser } from "~/utils";
import { FaRegUser } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";


const LINKS = [
  { name: 'Accueil', to: '/' },
  { name: 'Planning', to: '/planning' },
  { name: 'Actus', to: '/news' }
]

function Navbar() {
  const user = useOptionalUser();

  return (
    <div className="flex flex-col sticky top-0 z-50">
      <header className="flex h-14 border-b border-gray-200 bg-white dark:bg-dark dark:border-gray-800/80 dark:text-slate-100 dark:backdrop-blur-xl">
      {/* <header className="flex h-14 border-b border-gray-200 backdrop-blur-md text-black bg-white/80 dark:bg-slate-900/90 dark:border-gray-800 dark:text-slate-100 dark:backdrop-blur-md"> */}
        <div className="flex flex-row w-full h-full justify-between items-center f-container">
          <Logo />

          <div className="hidden space-x-10 md:flex md:flex-1 justify-center">

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
          <div className="flex space-x-5 align-middle items-center text-gray-600 dark:text-gray-300">
            <Link
              to="/"
              prefetch="intent"
            >
              <RiSearchLine className='w-5 h-5' />
            </Link>

            {user ? (
              <NavLink
                to="/profil"
                className={({ isActive }) => isActive ? 'text-blue-tron' : ''}
                prefetch="render"
              >
                <FaRegUser className='w-5 h-5' />
              </NavLink>

            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? 'text-blue-tron' : ''}
                prefetch="render"
              >
                <FaRegUser className='w-5 h-5' />
              </NavLink>
            )}

            <ButtonDarkMode />
          </div>
        </div>
      </header>
    </div>
  )
}

export { Navbar }