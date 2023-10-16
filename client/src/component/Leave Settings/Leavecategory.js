function Leavecategory({ leave, setSelected }) {
  return (
    <div
      onClick={() => setSelected(leave)}
      className="group w-full md-w-[95%] h-fit border rounded-r-[5px] flex flex-row justify-left shadow-lg shadow-black/50 cursor-pointer items-center text-[17px] duration-500 bg-gray-100 dark:bg-sfy text-black dark:text-white"
    >
      <div
        className={`w-[20px] h-[180px] md:h-[200px] rounded-r-full group-hover:w-[35px] duration-500 ${
          leave?.color ? `${leave?.color}` : "bg-white"
        }  flex flex-col justify-center items-center`}
      ></div>
      <div className="w-[90%] h-fit flex flex-col justify-center items-center text-[14px] sm:text-[17px]">
        <div className="w-[90%] flex flex-row justify-between items-center border-b-2 border-b-black">
          <div
            className={`h-[30px] md:text-[25px] font-bold flex flex-row items-center mt-[5px] pb-[10px]`}
          >
            {leave?.leaveName}
          </div>

          {leave?.disable && <h1>Disabled</h1>}
        </div>

        <div className="w-[90%] h-[26px] flex flex-row items-center mt-[5px] border-b border-b-black">
          <h1 className="mr-[5px]">Allowance :</h1>
          <h1 className="font-bold">{leave?.offDays} days per year</h1>
        </div>
        <div className="w-[90%] h-[26px] flex flex-row items-center mt-[5px] border-b border-b-black">
          <h1 className="mr-[5px]">Max Days :</h1>
          <h1 className="font-bold">{leave?.maxDays} days per year</h1>
        </div>
        <div className="w-[90%] h-[26px] flex flex-row items-center mt-[5px]">
          <h1 className="mr-[5px]">Half Day Request :</h1>
          <h1 className="font-bold">
            {leave?.halfDayRequest ? "Allowed" : "Not Allowed"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Leavecategory;
