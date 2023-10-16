import React from "react";
import { rosterData } from "../../utils/static";

function ViewRoster() {
  const getBackground = (letter) => {
    if (letter === "M") {
      return "bg-blue-100";
    } else if (letter === "A") {
      return "bg-pink-100";
    } else if (letter === "R") {
      return "bg-yellow-100";
    } else {
      return "bg-white";
    }
  };

  return (
    <div className="max-w-[1500px] overflow-auto border dark:border-black dark:bg-sfy dark:text-white duration-500 rounded-md flex flex-col">
      <div className="min-w-[1024px] flex flex-col text-sm divide-y dark:divide-white/50">
        <div className="w-full flex flex-row divide-x dark:divide-white/50 bg-gray-100 dark:bg-black">
          <div className="w-[20%] font-semibold flex justify-center items-center py-2">
            Minimum staff requirement
          </div>
          <div className="w-[15%] font-semibold flex justify-center items-center py-2">
            Staff shortage
          </div>
          <div className="w-[20%] font-semibold flex justify-center items-center py-2">
            Date
          </div>
          <div className="w-[20%] font-semibold flex justify-center items-center py-2">
            5 Day week staff
          </div>
          <div className="w-[10%] font-semibold flex justify-center items-center py-2">
            Fixed shift
          </div>
          <div className="w-[15%] font-semibold flex justify-center items-center py-2">
            6 Day week staff
          </div>
        </div>

        <div className="w-full h-[26px] flex flex-row divide-x dark:divide-white/50 bg-gray-50 dark:bg-black/50">
          <div className="w-[20%] flex justify-center items-center divide-x dark:divide-white/50">
            <div className="w-1/2 h-full flex justify-center items-center divide-x dark:divide-white/50">
              <div className="w-1/4 h-full flex justify-center items-center">
                No.
              </div>
              <div className="w-3/4 h-full flex justify-center items-center">
                Morning
              </div>
            </div>
            <div className="w-1/2 h-full black flex justify-center items-center">
              Afternoon
            </div>
          </div>
          <div className="w-[15%] flex justify-center items-center divide-x dark:divide-white/50">
            <div className="w-1/2 h-full flex justify-center items-center">
              Morning
            </div>
            <div className="w-1/2 h-full black flex justify-center items-center">
              Afternoon
            </div>
          </div>
          <div className="w-[20%] flex justify-center items-center"></div>
          <div className="w-[20%] flex justify-center items-center divide-x dark:divide-white/50">
            <div className="w-1/4 h-full flex justify-center items-center">
              1
            </div>
            <div className="w-1/4 h-full flex justify-center items-center">
              2
            </div>
            <div className="w-1/4 h-full flex justify-center items-center">
              3
            </div>
            <div className="w-1/4 h-full flex justify-center items-center">
              4
            </div>
          </div>
          <div className="w-[10%] flex justify-center items-center">5</div>
          <div className="w-[15%] flex justify-center items-center divide-x dark:divide-white/50">
            <div className="w-1/2 h-full flex justify-center items-center">
              6
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
              7
            </div>
          </div>
        </div>

        {rosterData.map((data, index) => (
          <div
            key={index}
            className="w-full h-[26px] flex flex-row divide-x dark:divide-white/50"
          >
            <div className="w-[20%] flex justify-center items-center divide-x dark:divide-white/50">
              <div className="w-1/2 h-full flex justify-center items-center divide-x dark:divide-white/50">
                <div className="w-1/4 h-full flex justify-center items-center">
                  {index + 1}
                </div>
                <div className="w-3/4 h-full flex justify-center items-center">
                  {data?.minStaff?.morning}
                </div>
              </div>
              <div className="w-1/2 h-full black flex justify-center items-center">
                {data?.minStaff?.afternoon}
              </div>
            </div>
            <div className="w-[15%] flex justify-center items-center divide-x dark:divide-white/50">
              <div
                className={`w-1/2 h-full flex justify-center items-center ${
                  data?.shortage?.morning > 0 && "bg-pink-200 text-black"
                }`}
              >
                {data?.shortage?.morning}
              </div>
              <div
                className={`w-1/2 h-full flex justify-center items-center ${
                  data?.shortage?.afternoon > 0 && "bg-pink-200 text-black"
                }`}
              >
                {data?.shortage?.afternoon}
              </div>
            </div>
            <div className="w-[20%] flex justify-center items-center">
              {data?.date}
            </div>
            <div className="w-[20%] flex justify-center items-center divide-x dark:divide-white/50">
              <div
                className={`w-1/4 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.fiveDayStaff?.one
                )}`}
              >
                {data?.fiveDayStaff?.one}
              </div>
              <div
                className={`w-1/4 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.fiveDayStaff?.two
                )}`}
              >
                {data?.fiveDayStaff?.two}
              </div>
              <div
                className={`w-1/4 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.fiveDayStaff?.three
                )}`}
              >
                {data?.fiveDayStaff?.three}
              </div>
              <div
                className={`w-1/4 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.fiveDayStaff?.four
                )}`}
              >
                {data?.fiveDayStaff?.four}
              </div>
            </div>
            <div
              className={`w-[10%] flex justify-center items-center dark:text-black ${getBackground(
                data?.fixedStaff?.five
              )}`}
            >
              {data?.fixedStaff?.five}
            </div>
            <div className="w-[15%] flex justify-center items-center divide-x dark:divide-white/50">
              <div
                className={`w-1/2 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.sixDayStaff?.six
                )}`}
              >
                {data?.sixDayStaff?.six}
              </div>
              <div
                className={`w-1/2 h-full flex justify-center items-center dark:text-black ${getBackground(
                  data?.sixDayStaff?.seven
                )}`}
              >
                {data?.sixDayStaff?.seven}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRoster;
