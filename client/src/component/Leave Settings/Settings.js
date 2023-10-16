import { useState, useEffect } from "react";
import Workdays from "./Workdays";
import Custom from "./Custom.js";
import { day, type, plus, custom, calenderIcon } from "../../assets/icons";
import Leavetype from "./Leavetype";
import Leavetypeform from "./Leavetypeform";
import Detail from "./Detail";
import SideModal from "../SideModal";
import { getLeaveTypes } from "../../API/leaveCalls";
// import { loadingSvg } from "../../assets/icons";
import SvgLoading from "../spinners/SvgLoading";
import LeaveCalendar from "./LeaveCalendar";

function Settings() {
  const [showTypes, setShowTypes] = useState("types");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(0);
  const [selected, setSelected] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    get_leave_types();
  }, [reload]);

  const get_leave_types = async () => {
    setIsLoading(true);
    const { data } = await getLeaveTypes();
    setIsLoading(false);
    if (data) {
      setData(data.leaveTypes);
    }
  };

  function handleShow() {
    if (showTypes === "types") {
      setShowAddForm(true);
    } else if (showTypes === "custom") {
      setShowCustomForm(true);
    }
  }

  return (
    <div className="w-full h-fit">
      {!selected && !selectedDay && (
        <div className="w-full h-[40px] mb-[15px] flex flex-row justify-between">
          <div className="flex flex-row">
            <button
              onClick={() => setShowTypes("types")}
              className={`group text-[10px] sm:text-[16px] w-fit h-[35px] sm:h-full justify-center border duration-500 border-gray-100 dark:border-sfy px-2 sm:px-3 hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
                showTypes === "types"
                  ? "bg-gray-100 dark:bg-sfy dark:text-white"
                  : "bg-white dark:text-sfy"
              } flex flex-row items-center rounded-l-[5px]`}
            >
              {type}
              <span
                className={`${
                  showTypes !== "types" && "hidden md:block"
                } ml-[10px]`}
              >
                Leave types
              </span>
            </button>

            <button
              onClick={() => setShowTypes("work")}
              className={`group text-[10px] sm:text-[16px] w-fit h-[35px] sm:h-full justify-center border duration-500 border-gray-100 dark:border-sfy px-2 sm:px-3 hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
                showTypes === "work"
                  ? "bg-gray-100 dark:bg-sfy dark:text-white"
                  : "bg-white dark:text-sfy"
              } flex flex-row items-center`}
            >
              {day}
              <span
                className={`${
                  showTypes !== "work" && "hidden md:block"
                } ml-[10px]`}
              >
                Working days
              </span>
            </button>

            <button
              onClick={() => setShowTypes("custom")}
              className={`group text-[10px] sm:text-[16px] w-fit h-[35px] sm:h-full justify-center border duration-500 border-gray-100 dark:border-sfy px-2 sm:px-3 hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
                showTypes === "custom"
                  ? "bg-gray-100 dark:bg-sfy dark:text-white"
                  : "bg-white dark:text-sfy"
              } flex flex-row items-center`}
            >
              {custom}
              <span
                className={`${
                  showTypes !== "custom" && "hidden md:block"
                } ml-[10px]`}
              >
                Public holidays
              </span>
            </button>

            <button
              onClick={() => setShowTypes("leaveCalendar")}
              className={`group text-[10px] sm:text-[16px] w-fit h-[35px] sm:h-full justify-center border duration-500 border-gray-100 dark:border-sfy px-2 sm:px-3 hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
                showTypes === "leaveCalendar"
                  ? "bg-gray-100 dark:bg-sfy dark:text-white"
                  : "bg-white dark:text-sfy"
              } flex flex-row items-center rounded-r-[5px]`}
            >
              {calenderIcon}
              <span
                className={`${
                  showTypes !== "leaveCalendar" && "hidden md:block"
                } ml-[10px]`}
              >
                Leave calendar
              </span>
            </button>
          </div>

          {(showTypes === "custom" || showTypes === "types") && (
            <div className={`w-fit h-full flex items-start ml-[20px]`}>
              <button
                onClick={handleShow}
                className={`group px-2 sm:px-3 h-[35px] sm:h-full flex flex-row justify-around items-center border border-gray-100 hover:bg-gray-100 dark:hover:bg-sfy dark:border-sfy duration-500 text-black dark:text-sfy dark:hover:text-white rounded-[5px]`}
              >
                {plus}
                <span className="hidden md:block px-[5px] md:px-[15px] ml-[10px]">
                  {showTypes === "types"
                    ? "Add leave type"
                    : showTypes === "custom"
                    ? "Add public holiday"
                    : ""}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && showTypes === "types" && <SvgLoading />}
      {data.length === 0 && !isLoading && showTypes === "types" && (
        <h1 className="w-full text-center mt-24">
          Oops! There are no leave types.
        </h1>
      )}

      {!isLoading && showTypes === "types" && !selected && data && (
        <Leavetype data={data} setSelected={setSelected} />
      )}

      <SideModal open={showAddForm}>
        <Leavetypeform
          mode="create"
          leaves={data}
          setShowAddType={setShowAddForm}
          setReload={setReload}
          setSelected={setSelected}
        />
      </SideModal>

      {showTypes === "work" && <Workdays />}

      {showTypes === "custom" && (
        <Custom
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setShowCustomForm={setShowCustomForm}
          showCustomForm={showCustomForm}
        />
      )}

      {selected && showTypes === "types" && (
        <Detail
          leaves={data}
          setSelected={setSelected}
          details={selected}
          setReload={setReload}
          setShowAddForm={setShowAddForm}
        />
      )}

      {showTypes === "leaveCalendar" && <LeaveCalendar />}
    </div>
  );
}

export default Settings;
