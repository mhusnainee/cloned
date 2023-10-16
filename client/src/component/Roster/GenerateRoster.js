import { useState, useEffect } from "react";
import { select } from "../../assets/icons";
import ConfirmModal from "../ConfirmModal";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import { initialDate } from "../../utils/static";

function GenerateRoster() {
  const theme = useSelector(getTheme);

  const [departments, setDepartments] = useState([]);
  const [parameters, setParameters] = useState({
    department: "Culture",
    maxHours: 40,
    minHours: 25,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // get departments from database

    setDepartments([
      "Medicine",
      "Lifestyle",
      "Culture",
      "Supermarket",
      "Outlet 1",
      "Outlet 2",
      "Outlet 3",
    ]);
  }, []);

  const handle_input_change = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
  };

  const handleFormValidation = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    console.log(parameters);

    console.log("form submitted");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full md:w-[750px] flex flex-col text-[14px] sm:text-[16px] text-black dark:text-white bg-gray-50 dark:bg-sfy rounded-lg duration-500 p-4 md:p-8">
        <div className="w-full text-lg md:text-2xl pb-2 border-b flex justify-between items-center">
          <h5>Select roster parameters</h5>
          <h1>{select}</h1>
        </div>

        <div className="mt-8">
          <label htmlFor="department">Select Department</label>
          <select
            id="department"
            className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border dark:focus:border-black dark:focus:ring-black border-gray-300 pl-[10px] mt-[5px] outline-none duration-500"
            value={parameters.department}
            onChange={(e) => {
              setParameters({ ...parameters, department: e.target.value });
            }}
          >
            {departments.map((dep) => (
              <option
                key={dep}
                value={dep}
                className="dark:bg-black dark:text-white"
              >
                {dep}
              </option>
            ))}
          </select>
        </div>

        <form
          onSubmit={handleFormValidation}
          className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <label htmlFor="maxHours">
              Max work hours allowed per employee per week{" "}
              <span className="text-red-700 dark:text-black duration-500">
                *
              </span>
            </label>
            <input
              id="maxHours"
              name="maxHours"
              type="number"
              required
              className="text-black w-full h-[40px] border border-gray-300 rounded-md px-[10px] bg-gray-50 mt-[5px] dark:focus:border-black dark:focus:ring-black duration-500 outline-none"
              placeholder="40"
              value={parameters.maxHours}
              onChange={handle_input_change}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="minHours">
              Min work hours required per employee per week{" "}
              <span className="text-red-700 dark:text-black duration-500">
                *
              </span>
            </label>
            <input
              id="minHours"
              name="minHours"
              type="number"
              required
              className="text-black w-full h-[40px] border border-gray-300 rounded-md px-[10px] bg-gray-50 mt-[5px] dark:focus:border-black dark:focus:ring-black duration-500 outline-none"
              placeholder="40"
              value={parameters.minHours}
              onChange={handle_input_change}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="minstaff">
              Min work staff required on each shift{" "}
              <span className="text-red-700 dark:text-black duration-500">
                *
              </span>
            </label>
            <input
              id="minstaff"
              name="minstaff"
              type="number"
              required
              className="text-black w-full h-[40px] border border-gray-300 rounded-md px-[10px] bg-gray-50 mt-[5px] dark:focus:border-black dark:focus:ring-black duration-500 outline-none"
              placeholder="7"
              // value={parameters.minHours}
              // onChange={handle_input_change}
            />
          </div>

          <h1 className="col-span-2 border-b mt-2 py-2">Sheduling period</h1>

          <div className={`col-span-2 sm:col-span-1 flex flex-col`}>
            <label className="w-full mb-2 dark:text-white duration-500">
              Select start date
            </label>

            <DatePicker
              // value={customDayInfo?.offDate}
              placeholder={initialDate}
              // onChange={(e) => handleStartDateChange(e)}
              format="MMM DD YYYY"
              sort
              inputClass="w-full bg-gray-50 text-black placeholder:text-gray-400 rounded-md dark:focus:ring-black dark:focus:border-black border border-gray-300 duration-500 outline-none focus:outline-none h-[40px]"
              className={theme && "bg-dark"}
            />
          </div>

          <div className={`col-span-2 sm:col-span-1 flex flex-col`}>
            <label className="w-full mb-2 dark:text-white duration-500">
              Select end date
            </label>

            <DatePicker
              // value={customDayInfo?.offDate}
              placeholder={initialDate}
              // onChange={(e) => handleStartDateChange(e)}
              format="MMM DD YYYY"
              sort
              inputClass="w-full bg-gray-50 text-black placeholder:text-gray-400 rounded-md dark:focus:ring-black dark:focus:border-black border border-gray-300 duration-500 outline-none focus:outline-none h-[40px]"
              className={theme && "bg-dark"}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-black/60 dark:hover:bg-black rounded-md p-2 duration-500 text-white col-span-2 mt-4">
            Run roster
          </button>
        </form>
      </div>

      <ConfirmModal
        open={isModalOpen}
        message="Are you sure you want to run roster?"
        yes={handleSubmit}
        no={setIsModalOpen}
      />
    </>
  );
}

export default GenerateRoster;
