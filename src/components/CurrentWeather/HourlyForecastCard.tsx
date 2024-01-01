const HourlyForecastCard = ({
  day = "Monday",
  time = "21:50",
  value = "20",
}) => {
  return (
    <div className="py-[1px]">
      <div className="flex flex-row bg-gray-100 h-[75px]  pl-8 rounded-lg ">
        <div className="flex-col flex justify-between items-start py-3">
          <p className="text-sm font-light text-gray-500">{day}</p>
          <p className="text-base text-slate-900">{time}</p>
        </div>
        <p className="ml-auto font-medium text-base text-slate-900 mr-8 flex justify-end items-center ">
          {value}°C
        </p>
      </div>
    </div>
  );
};

export default HourlyForecastCard;
