import { Theme, useTheme } from '~/utils/theme-provider';
import { RiSunLine, RiMoonFill } from "react-icons/ri";
import { ImSun } from "react-icons/im";


function ButtonDarkMode() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    // console.log(theme);
  };

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === 'light'
          ? (
            <ImSun className='w-5 h-5 text-gray-400 mt-1' />
          )
          : (
            <RiMoonFill className='w-5 h-5 text-blue-tron mt-1' />
          )
        }
      </button>
    </>
  );
}

export { ButtonDarkMode }