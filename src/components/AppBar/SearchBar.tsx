import { ChangeEvent, useState } from "react";
import GetLocation from "./GetLocation";
import { optionType } from "../../types";

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const SearchBar = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data != null) setOptions(data);
        console.log({ data });
      });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value === "") return;
    getSearchOptions(value);
  };

  function onOptionSelect(option: optionType) {
    console.log(option);
  }

  return (
    <div className="flex shrink gap-3 md:order-none order-3 w-[900px] ">
      <div className=" w-full ">
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-slate-900 left-3"
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
            placeholder="Bhubaneswar"
            className="w-full py-3 pl-12 pr-4 text-slate-900 font-normal border-transparent rounded-md outline-none bg-gray-100"
          />
          <ul className="absolute w-full mt-1 bg-gray-100 text-slate-900 ml-1 rounded-lg ">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="h-10 text-left text-sm w-full hover:bg-slate-900 rounded mb-1 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => {
                    onOptionSelect(option);
                  }}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GetLocation />
    </div>
  );
};

export default SearchBar;
