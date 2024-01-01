import { Link } from "react-router-dom";
import useTheme from "../../utils/theme";

const ButtonGroup = () => {
  const [theme, toggleTheme] = useTheme();
  const icon = theme === "light" ? "moon" : "sun";

  return (
    <div className="ml-auto md:ml-0 flex-none">
      <div className="flex flex-row gap-3 ">
        <button
          className="bg-gray-100 dark:bg-slate-900 px-3 py-3 justify-center
         items-center flex-none flex rounded-lg hover:scale-90 transition ease-out"
          onClick={toggleTheme}
        >
          <img
            className="w-6 h-6 hover:scale-110 transition ease-out"
            src={`${icon}.svg`}
            alt="theme"
          />
        </button>
        <Link
          to="https://www.github.com/Rudra-cs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-slate-900 text-none text-slate-50 py-3 px-4 rounded-lg inline-flex items-center transform hover:scale-90">
            <img
              className="h-6 w-6 mr-2 hover:scale-110 transition ease-out"
              src="githubLight.svg"
              alt=""
            />
            <p className="font-medium">Support Project </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonGroup;
