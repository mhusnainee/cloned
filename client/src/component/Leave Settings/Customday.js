import defaultImage from "../../assets/defaultImage.png";

function Customday({ day, setSelectedDay }) {
  return (
    <div
      onClick={() => setSelectedDay(day)}
      className="w-[250px] h-[350px] rounded-[10px] dark:text-white shadow-lg shadow-black/50 hover:scale-105 flex flex-col bg-gray-200 dark:bg-sfy duration-500 cursor-pointer"
    >
      <div
        className="relative w-full h-[45%] rounded-t-[9px] flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            `url(${day?.picture})` !== "url()"
              ? `url(${day?.picture})`
              : `url(${defaultImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full rounded-t-[12px] flex flex-col justify-start items-start p-[10px] backdrop-brightness-[0.5] text-white">
          <h1 className="text-[18px]">{day?.name}</h1>
        </div>
      </div>

      <div className="w-full h-[30px] flex flex-row justify-between items-center px-[10px]">
        <h1>Days</h1>
        <h1>{day?.days}</h1>
      </div>

      {day?.multiDates?.length === 0 ? (
        <div className="w-full h-[30px] flex flex-row justify-between items-center px-[10px]">
          <h1>Offday date</h1>
          <h1>{day?.offDate}</h1>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col px-[10px]">
            <h1>Offdays dates</h1>

            <div className="w-full flex flex-wrap gap-1 mt-1">
              {day?.multiDates?.map((date, index) => (
                <div
                  key={index}
                  className="text-[10px] flex items-center border px-1 border-gray-400 dark:border-white/50 rounded-[5px]"
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="w-full px-[10px] mt-2">
        <h1 className="text-sm">Description</h1>
        <p className="text-[12px] truncate">{day?.description}</p>
      </div>
    </div>
  );
}

export default Customday;
