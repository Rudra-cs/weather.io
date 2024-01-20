import { ChangeEvent, useState } from "react";
import GetLocation from "./GetLocation";
import { optionType } from "../../types";
import { debounce } from "lodash";

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const SearchBar = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOptions(data || []);
        setIsDropdownVisible(data && data.length > 0);
        console.log({ data });
      });
  };

  const debouncedGetSearchOptions = debounce(getSearchOptions, 600);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value === "") {
      setOptions([]); // Clear options when input is empty
      setSelectedOption(null); // Reset selected option
      setIsDropdownVisible(false);
      return;
    }
    debouncedGetSearchOptions(value);
  };

  function onOptionSelect(option: optionType) {
    setSelectedOption(option);
    console.log(selectedOption);
    setIsDropdownVisible(false);
  }

  const onFocus = () => {
    setIsDropdownVisible(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200); // Delay to allow clicking on dropdown options
  };

  return (
    <div className="flex shrink gap-3 md:order-none order-3 w-[900px] ">
      <div className=" w-full ">
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-slate-900 left-3 dark:invert"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            spellCheck="false"
            value={term}
            onChange={onInputChange}
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Bhubaneswar"
            className="w-full py-3 pl-12 pr-4 text-slate-900 dark:text-white font-normal border-transparent rounded-md outline-none bg-gray-100 dark:bg-slate-900"
          />
          {/* <ul className="absolute w-full mt-1 bg-gray-100 dark:bg-slate-900 text-slate-900 rounded-lg ">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="h-10 text-left text-sm w-full hover:bg-slate-900 rounded mb-1 hover:text-white px-2 py-1 cursor-pointer dark:bg-slate-900 dark:text-white"
                  onClick={() => {
                    onOptionSelect(option);
                  }}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul> */}

          {options.length === 0 &&
            !loading &&
            !selectedOption &&
            isDropdownVisible && (
              <div className="absolute w-full mt-1 bg-gray-100 dark:bg-slate-900 text-slate-900 rounded-lg">
                <p className="h-10 text-left text-sm flex items-center justify-center px-2 py-1 dark:text-white">
                  No data available. Type more.
                </p>
              </div>
            )}
          {loading && (
            <div className="absolute w-full mt-1 bg-gray-100 dark:bg-slate-900 text-slate-900 rounded-lg">
              <p className="h-10 text-left text-sm px-2 py-1 dark:text-white">
                Loading...
              </p>
            </div>
          )}
          {options.length > 0 && !selectedOption && isDropdownVisible && (
            <ul className="absolute w-full mt-1 bg-gray-100 dark:bg-slate-900 text-slate-900 rounded-lg z-50">
              {options.map((option: optionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="h-10 text-left text-sm w-full hover:bg-slate-900 rounded mb-1 hover:text-white px-2 py-1 cursor-pointer dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
                    onClick={() => {
                      onOptionSelect(option);
                    }}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <GetLocation />
    </div>
  );
};

export default SearchBar;
