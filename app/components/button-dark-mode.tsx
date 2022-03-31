import { Theme, useTheme } from '~/utils/theme-provider';
import { RiMoonFill } from "react-icons/ri";
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
            <ImSun className='w-5 h-5 text-gray-400 md:mt-0.5' />
          )
          : (
            <RiMoonFill className='w-5 h-5 text-blue-tron md:mt-0.5' />
          )
        }
      </button>
    </>
  );
}

export { ButtonDarkMode }