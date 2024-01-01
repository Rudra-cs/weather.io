const Card = ({
  image,
  property,
  value,
  units,
}: {
  image: string;
  property: string;
  value: number | string;
  units: string;
}) => {
  return (
    <div className="flex flex-row bg-gray-100 h-[120px] mb-3 rounded-lg ">
      <div className="ml-5 flex justify-center items-center">
        <img className="h-12 w-12" src={`${image}.svg`} />
      </div>
      <div className="flex flex-col items-ceter justify-around ml-10 p-6">
        <h2 className="capitalize text-base text-gray-500 font-normal">
          {property}
        </h2>
        <h1 className="text-slate-900 text-2xl capitalize">
          {value} {units}
        </h1>
      </div>
    </div>
  );
};

export default Card;
