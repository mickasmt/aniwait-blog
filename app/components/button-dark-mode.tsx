import { Theme, useTheme } from '~/utils/theme-provider';
import { RiMoonLine } from "react-icons/ri";
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
            <ImSun className='w-5 h-5 ' />
          )
          : (
            <RiMoonLine className='w-[22px] h-[22px] ' />
          )
        }
      </button>
    </>
  );
}

export { ButtonDarkMode }