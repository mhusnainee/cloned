import { useState } from "react";
import { update, adjust, goBackIcon } from "../../assets/icons";
import Leavetypeform from "./Leavetypeform";

function Selectedtype({
  leaves,
  details,
  setSelected,
  setReload,
  setShowAddType,
}) {
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className="w-full md:w-[750px] h-fit flex flex-col">
      <div className="w-full h-[65px] border-b dark:border-b-black duration-500 mb-[15px] flex flex-row justify-between items-center dark:text-sfy text-[14px] sm:text-[20px]">
        <div className="flex flex-row items-center">
          <div
            className={`w-[20px] h-[20px] rounded-full mr-[5px] ${
              details?.color ? `${details?.color}` : "bg-white"
            }`}
          ></div>
          <h3 className="text-[20px] mb-[3px]">{details?.leaveName}</h3>
        </div>
        <button
          onClick={() => setSelected("")}
          className="flex flex-row items-center"
        >
          {goBackIcon} Back
        </button>
      </div>

      <div className="w-full h-[40px] mb-[15px] flex flex-row">
        <button
          onClick={() => setShowSetting(false)}
          className={`group w-[50%] h-full justify-center border dark:text-sfy duration-500 border-gray-100 dark:border-sfy p-[15px] hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
            !showSetting
              ? "bg-gray-100 dark:bg-sfy dark:text-white"
              : "bg-white"
          } flex flex-row items-center rounded-l-[5px]`}
        >
          {adjust}
          Details
        </button>

        <button
          onClick={() => setShowSetting(true)}
          className={`group w-[50%] h-full justify-center border dark:text-sfy duration-500 border-gray-100 dark:border-sfy p-[15px] hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
            showSetting ? "bg-gray-100 dark:bg-sfy dark:text-white" : "bg-white"
          } flex flex-row items-center rounded-r-[5px]`}
        >
          {update}
          Updates
        </button>
      </div>

      {!showSetting && (
        <div className="w-full h-fit duration-500 bg-gray-100 dark:bg-sfy flex flex-col justify-around items-center rounded-[5px] dark:text-white px-[10px] sm:px-[30px] py-[20px]">
          <div className="w-full h-[30px] sm:h-[50px] flex flex-row justify-between items-center">
            <div className="flex flex-row text-[17px] sm:text-[20px]">
              Leave parameters
            </div>
          </div>

          <hr className="w-full border-t-[2px] dark:border-t-black duration-500"></hr>

          <div className="w-full h-fit mt-3 text-[14px] sm:text-[16px]">
            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Total Off Days</h1>
              <p>{details?.offDays}</p>
            </div>
            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Consecutive Off Days</h1>
              <p>{details?.maxDays}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Half day request</h1>
              <p>{details?.halfDayRequest ? "Yes" : "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Enforce Allowance</h1>
              <p>{details?.permissionRequired ? "true" : "false"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Carry farward leaves</h1>
              <p>{details?.carryFarward || "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Notice period</h1>
              <p>{details?.noticePeriod || "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Disabled</h1>
              <p>{details?.disable ? "Yes" : "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Count half day as full day</h1>
              <p>{details?.countHalfDayFullDay ? "Yes" : "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Count rest day as part of leave</h1>
              <p>{details?.inclusiveOffDays ? "Yes" : "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Pro rata basis</h1>
              <p>{details?.proRata ? "Yes" : "No"}</p>
            </div>

            <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
              <h1>Shared pool</h1>
              <p>{details?.sharedPool ? "Yes" : "No"}</p>
            </div>

            {details?.isShared && (
              <div className="w-full flex flex-row justify-between mt-2 border-b dark:border-b-black duration-500 text-black dark:text-white">
                <h1>Shared with</h1>
                <p>{details?.sharedLeave}</p>
              </div>
            )}

            <h1 className="w-full mt-3">Description</h1>
            <p className="w-full h-fit rounded-[5px] text-justify">
              {details?.leaveDescription}
            </p>
          </div>
        </div>
      )}

      {showSetting && (
        <Leavetypeform
          leaves={leaves}
          mode="update"
          details={details}
          setShowAddType={setShowAddType}
          setReload={setReload}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}

export default Selectedtype;
