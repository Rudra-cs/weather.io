import { useRecoilValue } from "recoil";
import { forecastState } from "../../store/forecastStore";
import { ForecastRoot } from "../../types";
import {
  useConvertTimeDay,
  useConvertTimeHours,
} from "../../utils/useConvertTime";

const HourlyForecastCard = ({
  day = "Monday",
  time = "21:50",
  mpIndex = 0,
}) => {
  const forecastdata = useRecoilValue<ForecastRoot>(forecastState);
  const convertedDay =
    useConvertTimeDay(forecastdata?.list[mpIndex]?.dt) || day;
  const convertedHours =
    useConvertTimeHours(forecastdata?.list[mpIndex]?.dt) || time;
  return (
    <div>
      {forecastdata && (
        <div className="py-[1px]">
          <div className="flex flex-row bg-transparent h-[75px]  pl-8 rounded-lg dark:text-white dark:bg-slate-900">
            <div className="flex-col flex justify-between items-start py-3">
              <p className="text-sm font-light text-gray-500 ">
                {convertedDay}
              </p>
              <p className="text-base text-slate-900 dark:text-white">
                {convertedHours}
              </p>
            </div>
            <p className="ml-auto font-medium text-base text-slate-900 mr-8 flex justify-end items-center dark:text-white">
              {Math.floor(forecastdata?.list[mpIndex].main.temp)}°C
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyForecastCard;
