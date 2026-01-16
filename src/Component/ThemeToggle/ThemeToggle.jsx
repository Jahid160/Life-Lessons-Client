import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md 
                 bg-gray-200 text-black
                 dark:bg-gray-800 dark:text-white
                 transition"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
