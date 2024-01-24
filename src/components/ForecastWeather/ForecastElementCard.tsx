import React from "react";

const ForecastElementCard = ({
  image,
  property,
  value,
  units,
}: {
  image: string;
  property: string;
  value: number | string;
  units: string;
}): React.ReactElement => {
  return (
    <div className="flex flex-row bg-gray-100 dark:bg-slate-900 h-[80px] md:h-[80px] rounded-lg  ">
      <div className=" flex justify-center items-center ml-[25px]">
        <img className="h-12 w-12 dark:invert" src={`${image}.svg`} />
      </div>
      <div className="flex flex-col items-ceter justify-center ml-2">
        <h2 className="capitalize text-sm text-gray-500 font-normal">
          {property}
        </h2>
        <h1 className="text-slate-900 dark:text-white text-sm sm:text-base font-medium capitalize">
          {value} {units}
        </h1>
      </div>
    </div>
  );
};

export default ForecastElementCard;
