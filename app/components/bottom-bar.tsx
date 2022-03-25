import { NavLink } from "remix"
// import { useOptionalUser } from "~/utils";
// import { AiFillHome } from 'react-icons/ai';
// import { BsFillCalendarFill, BsLightningChargeFill } from 'react-icons/bs';
import { HiNewspaper, HiHome, HiCalendar } from 'react-icons/hi';

const NAV_LINKS = [
  {
    id: 1,
    icon: <HiHome className="w-5 h-5" />,
    name: "Accueil",
    to: "/",
  },
  {
    id: 2,
    icon: <HiCalendar className="w-5 h-5" />,
    name: "Planning",
    to: "/planning",
  },
  {
    id: 3,
    icon: <HiNewspaper className="w-5 h-5" />,
    name: "Actus",
    to: "/news",
  },
];

function BottomBar() {
  // const user = useOptionalUser();

  return (
    <div className="flex fixed inset-x-0 bottom-0 h-12 border-t border-gray-200 w-full backdrop-blur-lg z-50 text-gray-900 md:hidden sm:h-14 bg-white dark:bg-gray-900/90 dark:border-gray-800 dark:text-gray-100 dark:backdrop-blur-xl">
      <div className="f-container flex w-full h-full justify-between items-center space-x-3">

        {NAV_LINKS.map(link => (
          <NavLink
            to={link.to}
            key={link.id}
            className={({ isActive }) => isActive ? 'text-blue-tron h-full w-full' : 'h-full w-full text-gray-800 dark:text-gray-100'}
            prefetch="render"
          >
            <div className="flex w-full h-full justify-center items-center">
              {/* <UtilsRawSvg className="text-sky-600" :name="item.icon"></UtilsRawSvg> */}
              {link.icon} 
              {/* <className='w-5 h-5 text-blue-tron' /> */}
              <span className="ml-2 text-base">{link.name}</span>
            </div>
          </NavLink>
        ))}

        {/* <NavLink className="h-full w-full hover:text-inherit focus:text-inherit" :to="item.link" v-for="item in nav_list" :key="item.id">
        <div className="flex w-full h-full justify-center items-center">
          <UtilsRawSvg className="text-sky-600" :name="item.icon"></UtilsRawSvg><span className="ml-2 text-base">{{ item.name }}</span>
      </div>
    </NavLink> */}

      </div >
    </div >
  )
}

export { BottomBar }

