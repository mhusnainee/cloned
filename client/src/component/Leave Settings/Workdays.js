import { useState, useEffect, Fragment } from "react";
import Day from "./Day";
import { settingWhite, crossWhite } from "../../assets/icons";
import { weekDays } from "../../utils/static";
import DayModal from "./DayModal";
import { getworkdays } from "../../API/leaveCalls";
// import { loadingSvg } from "../../assets/icons";
import SvgLoading from "../spinners/SvgLoading";

function Workdays() {
  const [edit, setEdit] = useState(false);
  const [fullDays, setFullDays] = useState([]);
  const [halfDays, setHalfDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(false);
  const [reload, setReload] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    get_workdays();
  }, [reload]);

  const get_workdays = async () => {
    setIsLoading(true);
    const { data } = await getworkdays();
    setIsLoading(false);
    if (data) {
      setFullDays(data.weekDays);
      setHalfDays(data.halfDays);
    }
  };

  return (
    <>
      <div className="w-full md:w-[750px] h-fit flex flex-col text-black dark:text-white bg-gray-100 dark:bg-[#aa002d] duration-500 p-[10px] sm:p-[30px] rounded-[5px]">
        <div className="w-full h-[25px] flex flex-row justify-between items-start mb-[20px]">
          <h1 className="text-lg font-semibold">Week days</h1>
          <button
            onClick={() => setEdit(!edit)}
            className="flex flex-row items-center"
          >
            {edit ? crossWhite : settingWhite}
          </button>
        </div>

        <div className="w-full py-2 border border-black/30 dark:border-white/50 my-[10px] flex duration-500 flex-col justify-start text-black dark:text-white items-center rounded-[5px] overflow-hidden">
          {!edit && <h1>Editing disabled, press settings icon to enable</h1>}
          {edit && <h1>Editing enabled</h1>}
        </div>

        <h1 className="my-[30px] text-[22px]">Working days and schedule</h1>

        <div className="w-full h-[320px] grid grid-cols-2 gap-2 sm:gap-6 text-[13px] sm:text-[16px]">
          {isLoading && (
            <div className="col-span-2">
              <SvgLoading />
            </div>
          )}
          {!isLoading &&
            weekDays.map((day, index) => (
              <Fragment key={index}>
                {fullDays.includes(index + 1) ? (
                  <>
                    {halfDays.includes(index + 1) ? (
                      <Day
                        key={index}
                        number={index + 1}
                        edit={edit}
                        setSelectedDay={setSelectedDay}
                        name={day}
                        status={true}
                        schedule="halfday"
                      />
                    ) : (
                      <Day
                        key={index}
                        number={index + 1}
                        edit={edit}
                        setSelectedDay={setSelectedDay}
                        name={day}
                        status={true}
                        schedule="fullday"
                      />
                    )}
                  </>
                ) : halfDays.includes(index + 1) ? (
                  <Day
                    key={index}
                    number={index + 1}
                    edit={edit}
                    setSelectedDay={setSelectedDay}
                    name={day}
                    status={true}
                    schedule="halfday"
                  />
                ) : (
                  <Day
                    key={index}
                    number={index + 1}
                    edit={edit}
                    setSelectedDay={setSelectedDay}
                    name={day}
                    status={false}
                    schedule="offday"
                  />
                )}
              </Fragment>
            ))}
        </div>
      </div>

      <DayModal
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setReload={setReload}
        halfDays={halfDays}
        fullDays={weekDays}
      />
    </>
  );
}

export default Workdays;
