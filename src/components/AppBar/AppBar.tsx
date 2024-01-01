import ButtonGroup from "./ButtonGroup";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const AppBar = () => {
  return (
    <div>
      <div
        className="md:flex-nowrap flex-wrap items-center flex 
       gap-3 w-full mb-5"
      >
        <Logo />
        <SearchBar />
        <ButtonGroup />
      </div>
    </div>
  );
};

export default AppBar;
