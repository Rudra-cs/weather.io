import { useRecoilValue } from "recoil";
import { choosenTheme } from "../../store/storeTheme";

const Logo = () => {
  const theme = useRecoilValue(choosenTheme);
  const imgSrc = theme === "light" ? "favicon-dark.ico" : "favicon-light.ico";
  return (
    <div className=" flex-none bg-gray-100 dark:bg-slate-900 flex justify-center items-center p-3 rounded-lg">
      <img src={`${imgSrc}`} className="w-6 h-6" />
      <p className="font-medium mx-3 dark:text-white">weather</p>
    </div>
  );
};

export default Logo;
