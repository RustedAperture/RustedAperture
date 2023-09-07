import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }


  return (
    <a
      className={`ml-2 min-w-[42px] max-h-[42px] flex justify-center items-center aspect-square text-white rounded-lg hover:bg-neutral-500 bg-neutral-600 border-transparent d hover:scale-110 active:scale-100 duration-200 bg-slate-800 dark:bg-yellow-200`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
        {theme === "light"
            ? <FontAwesomeIcon icon={faMoon} className="" />
            : <FontAwesomeIcon icon={faSun} className="" />
        }
    </a>
  );
};