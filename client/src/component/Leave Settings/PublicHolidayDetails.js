import React from "react";
import { useState } from "react";
import CustomdayForm from "./CustomdayForm";
import { goBackIcon, update, adjust } from "../../assets/icons";
import defaultImage from "../../assets/defaultImage.png";

const PublicHolidayDetails = React.memo(function PublicHolidayDetails({
  details,
  setSelectedDay,
  setReload,
  setShowCustomForm,
  setData,
}) {
  const [showUpdates, setShowUpdates] = useState(false);

  return (
    <div className="w-full md:w-[750px] h-fit flex flex-col">
      <div className="w-full h-[65px] border-b mb-[15px] flex flex-row justify-between items-center dark:text-sfy text-[14px] sm:text-[20px]">
        <h3 className="mb-[3px]">{details?.name}</h3>
        <button
          onClick={() => setSelectedDay("")}
          className="flex flex-row items-center"
        >
          {goBackIcon} Back
        </button>
      </div>

      <div className="w-full h-[40px] mb-[15px] flex flex-row">
        <button
          onClick={() => setShowUpdates(false)}
          className={`group w-[50%] h-full justify-center border dark:text-sfy duration-500 border-gray-100 dark:border-sfy p-[15px] hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
            !showUpdates
              ? "bg-gray-100 dark:bg-sfy dark:text-white"
              : "bg-white"
          } flex flex-row items-center rounded-l-[5px]`}
        >
          {adjust}
          Details
        </button>

        <button
          onClick={() => setShowUpdates(true)}
          className={`group w-[50%] h-full justify-center border dark:text-sfy duration-500 border-gray-100 dark:border-sfy p-[15px] hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
            showUpdates ? "bg-gray-100 dark:bg-sfy dark:text-white" : "bg-white"
          } flex flex-row items-center rounded-r-[5px]`}
        >
          {update}
          Updates
        </button>
      </div>

      {!showUpdates && (
        <div className="w-full h-fit duration-500 bg-gray-100 dark:bg-sfy flex flex-col justify-around items-center rounded-[5px] dark:text-white p-[10px] sm:p-[30px]">
          <div
            className="relative w-full h-[350px] rounded-[5px] flex flex-col justify-center items-center"
            style={{
              backgroundImage:
                `url(${details?.picture})` !== "url()"
                  ? `url(${details?.picture})`
                  : `url(${defaultImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="w-full h-fit mt-3 text-[14px] sm:text-[16px]">
            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Multiple days</h1>
              <p>
                {details?.multiDates?.length > 0
                  ? details?.multiDates?.length
                  : "No"}
              </p>
            </div>

            {details?.multiDates?.length > 0 ? (
              <>
                <p className="mt-[10px]">Multiple dates</p>
                <div className="w-full flex flex-row flex-wrap gap-2 mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white py-[3px]">
                  {details?.multiDates?.map((date, index) => (
                    <p
                      key={index}
                      className="bg-blue-200 dark:bg-black/70 rounded-[3px] px-[5px] text-black dark:text-white duration-500"
                    >
                      {date},
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-[30px] flex flex-row justify-between items-center">
                <h1>Offday date</h1>
                <h1>{details?.offDate}</h1>
              </div>
            )}

            <h1 className="w-full mt-3 border-b dark:border-b-black">
              Description
            </h1>
            <p className="w-full h-fit rounded-[5px] text-justify mt-2">
              {details?.description}
            </p>
          </div>
        </div>
      )}

      {showUpdates && (
        <CustomdayForm
          mode="update"
          data={details}
          setSelectedDay={setSelectedDay}
          setShowCustomForm={setShowCustomForm}
          setReload={setReload}
          setData={setData}
        />
      )}
    </div>
  );
});

export default PublicHolidayDetails;
