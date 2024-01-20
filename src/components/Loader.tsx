const Loader = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <img className="h-20 w-20" src="animated/pressure.svg" alt="" />
      <p className="font-mono">Please wait we are looking outside for you.</p>
    </div>
  );
};

export default Loader;
