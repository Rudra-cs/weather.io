import { ChangeEvent, useEffect, useState } from "react";
import GetLocation from "./GetLocation";
import { optionType } from "../../types";
import { useRecoilState } from "recoil";
import { forecastState } from "../../store/forecastStore";
import { weather } from "../../store/weatherStore";


const SearchBar = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [weatherdata, setWeatherData] = useRecoilState(weather);
  const [forecastdata, setForecastData] = useRecoilState(forecastState);

  const getSearchOptions = (value: string) => {
    setIsDropdownVisible(true);
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOptions(data || []);
        setIsDropdownVisible(data && data.length > 0);
      });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (term.trim() !== "") {
        getSearchOptions(term);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value === "") {
      setOptions([]); // Clear options when input is empty
      setSelectedOption(null); // Reset selected option
      setIsDropdownVisible(false);
      return;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && options.length > 0) {
      // If Enter key is pressed and there are options, select the first option
      getWeatherAndForecast(term);
      setTimeout(() => {
        setIsDropdownVisible(false);
      }, 200);
    }
  };

  function onOptionSelect(option: optionType) {
    setSelectedOption(option);
    getWeatherAndForecast(option?.name);
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  }

  const getWeatherAndForecast = (city: string) => {
    // api call
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setWeatherData(data);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setIsDropdownVisible(false);
        setForecastData(data);
      })
      .catch((error) => {
        console.log(error);
        console.log(weatherdata);
        console.log(forecastdata);
      });
  };

  const onFocus = () => {
    setIsDropdownVisible(true);
  };

  const onBlur = () => {
    // Check if relatedTarget is not within the dropdown to avoid hiding when clicking on options
    setTimeout(() => {
      if (!document.activeElement?.closest(".dropdown-container")) {
        setIsDropdownVisible(false);
      }
    }, 200);
  };

  return (
    <div className="flex shrink gap-3 md:order-none order-3 w-[900px] ">
      <div className=" w-full ">
        <div className="relative dropdown-container">
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
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder="Bhubaneswar"
            className="w-full py-3 pl-12 pr-4 text-slate-900 dark:text-white font-normal border-transparent rounded-md outline-none bg-gray-100 dark:bg-slate-900"
          />

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
              <p className=" text-center h-10  text-sm px-2 py-1 dark:text-white">
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
