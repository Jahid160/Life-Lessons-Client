import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
<button className="btn btn-primary" onClick={toggleTheme}>
  {theme}
  <br />
  <small>html has dark? {document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}</small>
</button>
  );
};

export default ThemeToggle;
