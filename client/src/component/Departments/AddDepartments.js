import React, { useState } from "react";
import { loadingSvg, addIcon, deleteIcon } from "../../assets/icons";
import { add_department } from "../../API/department_calls";
import { toast } from "react-toastify";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";

const AddDepartments = ({ department }) => {
  const theme = useSelector(getTheme);

  const [departmentData, setDepartmentData] = useState({
    departmentName: department?.depName ?? "",
    shifts: department?.shifts ?? [],
  });
  const [shiftData, setShiftData] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
    minStaff: "",
  });
  const [isAddShift, setIsAddShift] = useState(department ? false : true);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = e.nativeEvent.submitter.value;
    if (button === "addShift") {
      if (isEdit) {
        handleEdit();
      } else {
        handleAddShift();
      }
    } else {
      if (departmentData.shifts.length === 0) {
        notify("Please add atleast one shift!", "error");
        return;
      }
      if (department) {
        console.log(departmentData);
        console.log("in edit mode");
      } else {
        console.log(departmentData);
        console.log("in create mode");
        // setLoading(true);
        // await add_department(departmentData)
        //   .then((res) => {
        //     setDepartmentData({ departmentName: "", shifts: [] });
        //     clearShiftData();
        //     if (res.data) {
        //       notify(res.data.message, "success");
        //     }
        //   })
        //   .catch((error) => {
        //     notify(error.message, "error");
        //   });
        // setLoading(false);
      }
    }
  };

  const handleAddShift = () => {
    if (isAddShift) {
      let shift = {
        shiftName: shiftData.shiftName,
        startTime: shiftData.startTime,
        endTime: shiftData.endTime,
        minStaff: shiftData.minStaff,
      };
      departmentData.shifts.push(shift);
      setDepartmentData({ ...departmentData, shifts: departmentData.shifts });
      clearShiftData();
      setIsAddShift(false);
      return;
    }
    setIsAddShift(true);
  };

  const handleEdit = () => {
    let copiedShifts = [...departmentData.shifts];
    copiedShifts[isEdit - 1] = {
      shiftName: shiftData.shiftName,
      startTime: shiftData.startTime,
      endTime: shiftData.endTime,
      minStaff: shiftData.minStaff,
    };
    setDepartmentData({ ...departmentData, shifts: copiedShifts });
    clearShiftData();
    setIsEdit(false);
  };

  const handleDeleteShift = (e, filterValue) => {
    e.preventDefault();
    e.stopPropagation();
    let updatedShifts = departmentData.shifts.filter(
      (item) => item.shiftName !== filterValue
    );
    setDepartmentData({ ...departmentData, shifts: updatedShifts });
    console.log("shift deleted");
  };

  const clearShiftData = () => {
    setShiftData({
      shiftName: "",
      startTime: "",
      endTime: "",
      minStaff: "",
    });
  };

  const handleMinStaffChange = (e) => {
    if (+e.target.value === Math.floor(+e.target.value)) {
      setShiftData({ ...shiftData, minStaff: e.target.value });
    } else {
      notify("Decimal numbers are not allowed!", "error");
    }
  };

  const getTimeObject = (inputString) => {
    let timeString = String(new Date());
    let splitted = timeString.split(" ");
    splitted[4] = inputString;
    return new Date(splitted.join(" "));
  };

  return (
    <div className="w-full md:w-[750px] mt-4 bg-gray-100 dark:bg-sfy dark:text-white duration-500 rounded-md">
      <div className="w-full p-4 md:p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 gap-4 text-black dark:text-white duration-500"
        >
          <div className="w-full">
            <label
              htmlFor="departmentName"
              className="block mb-2 text-sm font-medium"
            >
              Department Name{" "}
              <span className="text-red-700 dark:text-black duration-500">
                *
              </span>
            </label>

            <input
              id="departmentName"
              type="text"
              value={departmentData.departmentName}
              required
              placeholder="Enter department name"
              autoComplete="off"
              onChange={(e) =>
                setDepartmentData({
                  ...departmentData,
                  departmentName: e.target.value,
                })
              }
              className={`outline-none border-gray-300 text-gray-900 duration-500 text-sm rounded-md block w-full p-2.5 dark:focus:border-black dark:focus:ring-black`}
            />
          </div>

          {departmentData.shifts.length > 0 && (
            <div className="w-full flex flex-col gap-y-2 my-4">
              {departmentData.shifts.map((shift, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(index + 1);
                    setShiftData(shift);
                  }}
                  className="w-full py-3 px-4 cursor-pointer sm:px-8 bg-gray-300 dark:bg-black text-black dark:text-white duration-500 shadow-md rounded-md flex flex-row justify-between items-center"
                >
                  <h1>{shift.shiftName}</h1>
                  <span className="flex flex-row">
                    <h1>{shift.startTime}</h1>-<h1>{shift.endTime}</h1>
                  </span>
                  <h1>{shift.minStaff}</h1>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteShift(e, shift.shiftName)}
                  >
                    {deleteIcon}
                  </button>
                </div>
              ))}
            </div>
          )}

          {(isAddShift || isEdit) && (
            <>
              <div className="w-full">
                <label
                  htmlFor="shiftName"
                  className="block mb-2 text-sm font-medium"
                >
                  Shift Name{" "}
                  <span className="text-red-700 dark:text-black duration-500">
                    *
                  </span>
                </label>

                <input
                  id="shiftName"
                  type="text"
                  required
                  placeholder="Enter shift name"
                  autoComplete="off"
                  value={shiftData.shiftName}
                  onChange={(e) =>
                    setShiftData({ ...shiftData, shiftName: e.target.value })
                  }
                  className={`outline-none border-gray-300 text-gray-900 duration-500 text-sm rounded-md block w-full p-2.5 dark:focus:border-black dark:focus:ring-black`}
                />
              </div>

              <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 py-2">
                <div className="w-full">
                  <label
                    htmlFor="shiftStartTime"
                    className="block mb-2 text-sm font-medium"
                  >
                    Shift start time{" "}
                    <span className="text-red-700 dark:text-black duration-500">
                      *
                    </span>
                  </label>

                  <DatePicker
                    id="shiftStartTime"
                    required
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                    containerClassName="w-full"
                    inputClass="w-full outline-none bg-white text-black rounded-md p-2.5 border border-gray-300 duration-500 text-sm placeholder:text-sm focus:ring-blue-600 focus:border-blue-600 dark:focus:ring-black dark:focus:border-black"
                    className={theme && "bg-dark text-white"}
                    placeholder="09:00 AM"
                    value={
                      shiftData.startTime && getTimeObject(shiftData.startTime)
                    }
                    onChange={(e) =>
                      setShiftData({ ...shiftData, startTime: e.toString() })
                    }
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="shiftEndTime"
                    className="block mb-2 text-sm font-medium"
                  >
                    Shift end time{" "}
                    <span className="text-red-700 dark:text-black duration-500">
                      *
                    </span>
                  </label>

                  <DatePicker
                    id="shiftEndTime"
                    required
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                    containerClassName="w-full"
                    inputClass="w-full outline-none bg-white text-black rounded-md p-2.5 border border-gray-300 duration-500 text-sm placeholder:text-sm focus:ring-blue-600 focus:border-blue-600 dark:focus:ring-black dark:focus:border-black"
                    className={theme && "bg-dark text-white"}
                    placeholder="06:00 PM"
                    value={
                      shiftData.endTime && getTimeObject(shiftData.endTime)
                    }
                    onChange={(e) =>
                      setShiftData({ ...shiftData, endTime: e.toString() })
                    }
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="minStaff"
                  className="block mb-2 text-sm font-medium"
                >
                  Minimum staff required{" "}
                  <span className="text-red-700 dark:text-black duration-500">
                    *
                  </span>
                </label>

                <input
                  id="minStaff"
                  type="number"
                  required
                  placeholder="Enter number of minimum staff required"
                  autoComplete="off"
                  className={`outline-none border-gray-300 text-gray-900 duration-500 text-sm rounded-md block w-full p-2.5 dark:focus:border-black dark:focus:ring-black`}
                  value={shiftData.minStaff}
                  onChange={handleMinStaffChange}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            value="addShift"
            className="w-full p-1 border dark:border-black flex gap-x-2 justify-center items-center rounded-md bg-white hover:bg-blue-100 dark:bg-black/60 dark:hover:bg-black text-black dark:text-white outline-none focus:border-blue-400 dark:focus:border-white focus:ring-1 focus:ring-blue-400 dark:focus:ring-white duration-500"
          >
            {addIcon}Add shift
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex flex-row justify-center items-center mt-2 dark:bg-black/60 dark:hover:bg-black outline-none p-2 duration-500 rounded-[5px] text-white bg-blue-700  hover:bg-blue-800`}
          >
            {loading ? (
              <span className="flex items-center">
                {loadingSvg} Loading please wait...
              </span>
            ) : (
              <span>Add Department</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartments;
