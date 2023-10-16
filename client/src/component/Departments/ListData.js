import { useState } from "react";
import { Dropdown } from "flowbite-react";
import {
  delIcon,
  dots,
  editIcon,
  employees,
  shifts,
  details,
  goBackIcon,
  loadingSvg,
} from "../../assets/icons";
import Graph from "../Graph";
import AddDepartments from "./AddDepartments";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";
import MsgModel from "../Model/MsgModel";

const ListData = ({ data }) => {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isMsgModal, setIsMsgModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [toDelete, setToDelete] = useState("");
  const [loading, setloading] = useState(false);

  const handleDelete = async () => {
    setloading(true);
    console.log("Department deleted");
    // setIsDeleteModal(false);
    setIsMsgModal(false);
    // if sucess
    setTimeout(() => {
      setloading(false);
      setToDelete("");
      notify("Department deleted successfully!", "success");
    }, 2000);
    // failed
    // notify("error.message!", "error");
  };

  const getEmployees = (shifts) => {
    let employees = 0;
    shifts.map((shift) => (employees += shift.minStaff));
    return employees;
  };

  return (
    <>
      {!selectedDepartment && !selectedDetails && (
        <div className="w-full grid place-content-center place-items-center grid-cols-1 smd:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 mt-4 py-2">
          {deps?.map((item, index) => (
            <div
              key={index}
              className="w-full gap-y-4 min-w-[230px] max-w-[280px] xl:max-w-[330px] h-[350px] shadow-md bg-gray-100 dark:bg-sfy text-black dark:text-white duration-500 p-2 flex flex-col rounded-md"
            >
              {loading && toDelete === item.depName ? (
                <div className="w-full h-full flex justify-center items-center text-sm text-gray-500 dark:text-white/60">
                  {loadingSvg}Loading please wait...
                </div>
              ) : (
                <>
                  <div className="w-full p-2 flex justify-between items-center">
                    <h1 className="pl-2"> {item.depName}</h1>
                    <div className="w-6 h-8 flex justify-center items-center">
                      <Dropdown
                        label={
                          <div className="w-6 h-8 flex justify-center items-center">
                            {dots}
                          </div>
                        }
                        arrowIcon={false}
                        inline={true}
                        className="dark:!bg-black shadow-lg rounded-md"
                        placement="left-start"
                      >
                        <Dropdown.Item
                          onClick={() => setSelectedDetails(item)}
                          className="dark:hover:!bg-sfy"
                        >
                          {details}
                          <span className="ml-3">View details</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSelectedDepartment(item)}
                          className="dark:hover:!bg-sfy"
                        >
                          {editIcon}
                          <span className="ml-2">Edit department</span>
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => {
                            setIsDeleteModal(true);
                            setToDelete(item.depName);
                          }}
                          className="text-red-600 dark:text-sfy dark:hover:text-white dark:hover:!bg-sfy"
                        >
                          {delIcon}
                          <span className="ml-2">Delete department</span>
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="w-full py-2 px-4 flex justify-between items-start">
                    <div className="w-1/2 pl-3 flex items-start">
                      <span className="text-blue-600 dark:text-black duration-500">
                        {employees}
                      </span>
                      <div className="w-full pl-3">
                        <h1 className="text-[30px] font-semibold leading-5 pb-1">
                          {getEmployees(item?.shifts)}
                        </h1>
                        <h1 className="text-sm text-gray-400 dark:text-white/50 duration-500">
                          Employees
                        </h1>
                      </div>
                    </div>
                    <div className="w-1/2 pl-3 flex items-start">
                      <span className="text-blue-600 dark:text-black duration-500">
                        {shifts}
                      </span>
                      <div className="w-full pl-3">
                        <h1 className="text-[30px] font-semibold leading-5 pb-1">
                          {item?.shifts?.length}
                        </h1>
                        <h1 className="text-sm text-gray-400 dark:text-white/50 duration-500">
                          Shifts
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-row justify-around">
                    <div className="w-[100px] py-4">
                      <div className="w-[80px]">
                        <Graph size={100} data={[10, 7, 12]} />
                      </div>
                    </div>

                    <div className="min-w-[140px] py-4 flex flex-col justify-center gap-y-2 text-xs">
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <div className="w-[14px] h-[14px] bg-[#5868D0] rounded-[4px]"></div>
                        <h1>Active employees</h1>
                      </div>
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <div className="w-[14px] h-[14px] bg-[#F48FE4] rounded-[4px]"></div>
                        <h1>Archived employees</h1>
                      </div>
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <div className="w-[14px] h-[14px] bg-[#E2B669] rounded-[4px]"></div>
                        <h1>Interns</h1>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-14 border dark:border-white/30 rounded-md flex items-center justify-center">
                    Graph will be here
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedDepartment && (
        <div className="max-w-[750px] mt-4 text-black dark:text-sfy duration-500">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">
              Edit department details
            </span>
            <button
              onClick={() => setSelectedDepartment(null)}
              className="flex items-center"
            >
              {goBackIcon}Back
            </button>
          </div>

          <AddDepartments department={selectedDepartment} />
        </div>
      )}

      {selectedDetails && (
        <div className="max-w-[750px] mt-4 text-black dark:text-sfy duration-500">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">
              {selectedDetails.depName}
            </span>
            <button
              onClick={() => setSelectedDetails(null)}
              className="flex items-center"
            >
              {goBackIcon}Back
            </button>
          </div>

          <div className="w-full bg-gray-100 dark:bg-sfy space-y-3 rounded-md duration-500 p-6 mt-4">
            <div className="w-full flex justify-between items-center border-b dark:border-b-black text-black dark:text-white duration-500">
              <h1>Total shifts</h1>
              <h1>{selectedDetails.shifts.length}</h1>
            </div>

            <div className="w-full flex justify-between items-center border-b dark:border-b-black text-black dark:text-white duration-500">
              <h1>Total employees</h1>
              <h1>{getEmployees(selectedDetails.shifts)}</h1>
            </div>

            <div className="w-full pt-4 space-y-3">
              <div className="font-semibold py-1 text-black dark:text-white text-xl border-b dark:border-b-black duration-500">
                Shifts
              </div>
              {selectedDetails.shifts.map((shift, index) => (
                <div
                  key={index}
                  className="w-full p-4 bg-gray-200 dark:bg-black text-black dark:text-white space-y-1 rounded-md duration-500"
                >
                  <div className="w-full flex justify-between items-center font-semibold">
                    <h1>{shift.shiftName}</h1>
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <h1>Shift start time</h1>
                    <h1>{shift.startTime}</h1>
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <h1>Shift end time</h1>
                    <h1>{shift.endTime}</h1>
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <h1>Minimum staff required</h1>
                    <h1>{shift.minStaff}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={isDeleteModal}
        message="Are you sure you want to delete this department?"
        yes={() => {
          setIsMsgModal(true);
          setIsDeleteModal(false);
        }}
        no={setIsDeleteModal}
      />

      <MsgModel
        isOpen={isMsgModal}
        setIsOpen={handleDelete}
        title="Employee transfer"
        msg="Choose what you want to do with employees of the department? Like you can transfer them to some other department."
      />
    </>
  );
};

export default ListData;

const deps = [
  {
    depName: "Artificial Intelligence",
    shifts: [
      {
        shiftName: "Morning",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        minStaff: 7,
      },
      {
        shiftName: "Afternoon",
        startTime: "12:00 PM",
        endTime: "09:00 PM",
        minStaff: 4,
      },
    ],
  },

  {
    depName: "Full Stack",
    shifts: [
      {
        shiftName: "Morning",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        minStaff: 5,
      },
      {
        shiftName: "Afternoon",
        startTime: "12:00 PM",
        endTime: "09:00 PM",
        minStaff: 4,
      },
      {
        shiftName: "Evening",
        startTime: "06:00 PM",
        endTime: "01:00 AM",
        minStaff: 10,
      },
    ],
  },

  {
    depName: "Game Development",
    shifts: [
      {
        shiftName: "Morning",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        minStaff: 7,
      },
      {
        shiftName: "Afternoon",
        startTime: "12:00 PM",
        endTime: "09:00 PM",
        minStaff: 4,
      },
      {
        shiftName: "Evening",
        startTime: "06:00 PM",
        endTime: "01:00 AM",
        minStaff: 6,
      },
      {
        shiftName: "Custom",
        startTime: "06:00 PM",
        endTime: "01:00 AM",
        minStaff: 10,
      },
    ],
  },
];
