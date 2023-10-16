import React from "react";
import { useState, useEffect } from "react";
import { people, events } from "../../utils/static";
import { event, onLeave, dots } from "../../assets/icons";
import { Dropdown } from "flowbite-react";
import BottomModal from "../BottomModal";
import Select from "../Select";

const Dashboard = React.memo(function Dashboard() {
  // const [onLeaveData, setOnLeaveData] = useState([]);
  // const [eventsData, setEventsData] = useState([]);
  const [departments, setDepartments] = useState([
    "Medicine",
    "Lifestyle",
    "Culture",
    "Supermarket",
    "Outlet 1",
    "Outlet 2",
    "Outlet 3",
  ]);
  const [rosterData, setRosterData] = useState([
    { staff: "STAFF 1-6", date: new Date().toDateString(), day: "A" },
    { staff: "STAFF 2-5", date: new Date().toDateString(), day: "M" },
    { staff: "STAFF 3-F", date: new Date().toDateString(), day: "A" },
    { staff: "STAFF 4-5", date: new Date().toDateString(), day: "R" },
    { staff: "STAFF 5-5", date: new Date().toDateString(), day: "A" },
    { staff: "STAFF 6-5", date: new Date().toDateString(), day: "M" },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="relative overflow-hidden w-full flex flex-col">
      <div className="w-full flex gap-4 flex-col xl:flex-row">
        <div className="w-full h-fit xl:w-[40%] flex flex-col rounded-[5px] border overflow-hidden">
          <div className="flex justify-between items-center font-bold p-4 dark:bg-sfy border-b-2 border-b-gray-100 dark:border-b-black duration-500 sm:text-xl md:text-2xl text-gray-900 dark:text-white">
            Employees on leave{onLeave}
          </div>
          {loading && (
            <div className="w-full h-[400px] flex items-center justify-center dark:bg-sfy">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 dark:border-white border-t-transparent dark:border-t-transparent animate-spin m-auto"></div>
            </div>
          )}

          {!loading && (
            <ul className="w-full h-[400px] no-scrollbar overflow-auto divide-y divide-gray-100 p-2 sm:p-4 dark:bg-sfy dark:divide-black duration-500">
              {people.map((person) => (
                <li
                  key={person.email}
                  className="flex justify-between gap-x-4 md:gap-x-6 py-4 px-2 sm:px-4 md:px-6"
                >
                  <div className="flex flex-col sm:flex-row min-w-0 gap-x-2 sm:gap-x-4">
                    <img
                      className="h-8 sm:h-12 w-8 sm:w-12 flex-none rounded-full bg-gray-50"
                      src={person.imageUrl}
                      alt="employee"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-[12px] sm:text-[16px] font-semibold leading-6 text-gray-900 dark:text-white duration-500">
                        {person.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white/60 duration-500">
                        {person.email}
                      </p>
                    </div>
                  </div>

                  <div className=" shrink-0 flex flex-row items-center">
                    <div className="mr-2 md:mr-6">
                      <p className="text-sm leading-6 text-gray-900 dark:text-white duration-500">
                        {person.role}
                      </p>
                      <div className="flex flex-row text-gray-900 dark:text-white/60 text-[10px] sm:text-[12px]">
                        <p className="">{person.startDate} ,</p>{" "}
                        <p className="">{person.endDate}</p>
                      </div>
                    </div>

                    <Dropdown
                      label={
                        <div className="w-6 h-8 flex justify-center items-center">
                          {dots}
                        </div>
                      }
                      arrowIcon={false}
                      inline={true}
                      className="dark:!bg-black shadow-lg"
                      placement="left-start"
                    >
                      <Dropdown.Item className="dark:hover:!bg-sfy">
                        Sign out
                      </Dropdown.Item>

                      <Dropdown.Item className="dark:hover:!bg-sfy">
                        Toggle theme
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full xl:w-[30%] h-fit flex flex-col rounded-[5px]">
          <div className="w-full h-full flex flex-col border rounded-[5px] overflow-hidden">
            <div className="flex justify-between items-center font-bold p-4 dark:bg-sfy border-b-2 border-b-gray-100 dark:border-b-black duration-500 sm:text-xl md:text-2xl text-gray-900 dark:text-white">
              Today's events{event}
            </div>

            {loading && (
              <div className="w-full h-[300px] flex items-center justify-center dark:bg-sfy">
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 dark:border-white border-t-transparent dark:border-t-transparent animate-spin m-auto"></div>
              </div>
            )}

            {!loading && (
              <ul className="w-full h-[300px] no-scrollbar overflow-auto divide-y divide-gray-100 dark:bg-sfy dark:divide-black duration-500">
                {events?.map((event, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 py-3 hover:bg-gray-50 dark:hover:bg-black px-2 sm:px-6 cursor-pointer"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white duration-500">
                          {event?.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500 dark:text-white/60 duration-500">
                          {event?.details}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[110px] flex flex-col justify-center">
                      <p className="font-semibold text-lg sm:text-[24px] dark:text-white duration-500">
                        {event?.time}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white/60 duration-500">
                        {event?.dueDate}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full h-[80px] rounded-[5px] shadow bg-gray-50 dark:bg-sfy mt-[20px] dark:text-white duration-500 flex flex-col justify-around items-center px-8">
            <h5 className="text-lg font-semibold">Other data</h5>
            <button className="w-full p-1 bg-blue-500 dark:bg-black duration-500 text-white rounded-[5px] flex justify-center">
              Press
            </button>
          </div>
        </div>

        <div className="w-full xl:w-[30%] h-[468px] flex flex-col border rounded-[5px] text-black dark:text-white bg-white dark:bg-sfy duration-500">
          <div className="flex justify-between items-center font-bold p-4 border-b-2 border-b-gray-100 dark:border-b-black duration-500 sm:text-xl md:text-2xl text-gray-900 dark:text-white">
            Today's roster
            <div className="w-[150px]">
              <Select
                selectId="departmentSelect"
                dropdownId="departmentsDropdown"
                options={departments}
                selected={selectedDepartment}
                setSelected={(e) => setSelectedDepartment(e.target.value)}
                selectClassName="w-full py-1 px-1 flex flex-row justify-between text-black dark:text-white duration-500 items-center bg-transparent border-t-transparent border-l-transparent border-r-transparent border-b dark:focus:ring-sfy duration-500"
              />
            </div>
          </div>

          {loading && (
            <div className="w-full h-[400px] flex items-center justify-center dark:bg-sfy">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 dark:border-white border-t-transparent dark:border-t-transparent animate-spin m-auto"></div>
            </div>
          )}

          {!loading && (
            <>
              <div className="w-full h-fit flex flex-row divide-x dark:divide-black">
                <div className="w-2/6 flex justify-center items-center py-2 border-b dark:border-b-black">
                  Staff
                </div>
                <div className="w-3/6 flex justify-center items-center py-2 border-b dark:border-b-black">
                  Date
                </div>
                <div className="w-1/6 flex justify-center items-center py-2 border-b dark:border-b-black">
                  Duty
                </div>
              </div>

              {rosterData.map((data, index) => (
                <div
                  key={index}
                  className="w-full h-fit flex flex-row divide-x dark:divide-black text-sm"
                >
                  <div className="w-2/6 flex justify-center items-center py-1 border-b dark:border-b-black">
                    {data.staff}
                  </div>
                  <div className="w-3/6 flex justify-center items-center py-1 border-b dark:border-b-black">
                    {data.date}
                  </div>
                  <div
                    className={`w-1/6 flex justify-center text-black ${
                      data.day === "R" ? "bg-yellow-100" : "dark:text-white"
                    } items-center py-1 border-b dark:border-b-black`}
                  >
                    {data.day}
                  </div>
                </div>
              ))}

              <div className="w-ful flex flex-col divide-y dark:divide-black">
                <div className="w-full flex flex-row divide-x dark:divide-black">
                  <div className="w-2/6 py-1 flex justify-center items-center">
                    Staff 1
                  </div>
                  <div className="w-4/6 py-1 flex justify-center items-center">
                    11M/8A/9F/3R
                  </div>
                </div>

                <div className="w-full flex flex-row divide-x dark:divide-black">
                  <div className="w-2/6 py-1 flex justify-center items-center">
                    Staff 2
                  </div>
                  <div className="w-4/6 py-1 flex justify-center items-center">
                    6M/8A/8F/8R/1PH
                  </div>
                </div>

                <div className="w-full flex flex-row divide-x dark:divide-black">
                  <div className="w-2/6 py-1 flex justify-center items-center">
                    Staff 4
                  </div>
                  <div className="w-4/6 py-1 flex justify-center items-center">
                    6M/11A/5F/8R/1PH
                  </div>
                </div>

                <div className="w-full flex flex-row divide-x dark:divide-black">
                  <div className="w-2/6 py-1 flex justify-center items-center">
                    Staff 5
                  </div>
                  <div className="w-4/6 py-1 flex justify-center items-center">
                    10M/9A/4F/8R
                  </div>
                </div>

                <div className="w-full flex flex-row divide-x dark:divide-black">
                  <div className="w-2/6 py-1 flex justify-center items-center">
                    Staff 6
                  </div>
                  <div className="w-4/6 py-1 flex justify-center items-center">
                    6M/12A/6F/7R
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[140px] border dark:bg-sfy duration-500 mt-4 rounded-[5px] flex flex-row justify-around items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            key={item}
            className="w-[8%] h-[80%] bg-gray-50 rounded-[5px] flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="w-full mt-1 text-sm">
        <button
          onClick={() => setIsEdit(true)}
          className="underline text-blue-600 dark:text-sfy duration-500"
        >
          Edit
        </button>
      </div>

      <BottomModal open={isEdit}>
        <button
          onClick={(e) => setIsEdit(false)}
          className="w-40 h-8 border border-white text-white rounded-md hover:bg-white/10 duration-500 mt-4"
        >
          Close
        </button>

        <div className="w-full h-fit flex flex-row mt-6 text-white/20">
          <div className="w-[300px] h-[600px] bg-white/30 hidden lg:flex"></div>

          <div className="relative overflow-hidden w-full flex flex-col ml-4 pr-4 pl-2">
            <div className="w-full flex gap-4 flex-col xl:flex-row">
              <div className="w-full h-fit xl:w-[40%] flex flex-col rounded-[5px] border-2 border-dashed border-white cursor-pointer overflow-hidden">
                <div className="flex justify-between items-center font-bold p-4 border-2 border-dashed border-white cursor-pointer duration-500 sm:text-xl md:text-2xl text-gray-900 dark:text-white">
                  Employees on leave{onLeave}
                </div>

                <ul className="w-full h-[400px] no-scrollbar overflow-auto divide-y divide-gray-100 p-2 sm:p-4 dark:divide-black duration-500"></ul>
              </div>

              <div className="w-full xl:w-[30%] h-fit flex flex-col rounded-[5px]">
                <div className="w-full h-full flex flex-col border-2 border-dashed border-white cursor-pointer rounded-[5px] overflow-hidden">
                  <div className="flex justify-between items-center font-bold p-4 border-2 border-dashed border-white cursor-pointer duration-500 sm:text-xl md:text-2xl text-gray-900 dark:text-white">
                    Events{event}
                  </div>

                  <ul className="w-full h-[300px] no-scrollbar overflow-auto divide-y divide-gray-100 dark:divide-black duration-500"></ul>
                </div>

                <div className="w-full h-[80px] rounded-[5px] shadow border-2 border-dashed border-white cursor-pointer mt-[20px] flex flex-col justify-around items-center px-8">
                  <h5 className="text-lg font-semibold text-white">
                    Other data
                  </h5>
                  <button className="w-full p-1 bg-blue-500 dark:bg-black duration-500 text-white rounded-[5px] flex justify-center">
                    Press
                  </button>
                </div>
              </div>

              <div className="w-full xl:w-[30%] text-white h-[468px] border-2 border-dashed border-white cursor-pointer flex flex-col justify-around items-center rounded-[5px] duration-500">
                Some other data
              </div>
            </div>

            <div className="w-full h-[140px] border-2 border-dashed border-white cursor-pointer duration-500 mt-4 rounded-[5px] flex flex-row justify-around items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div
                  key={item}
                  className="w-[8%] h-[80%] border-2 border-dashed border-white cursor-pointer rounded-[5px] flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BottomModal>
    </div>
  );
});

export default Dashboard;
