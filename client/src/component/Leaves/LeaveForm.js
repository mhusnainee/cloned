import React from "react";
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
// import { get_users } from "../../auth/authService";
import { requestLeave, getworkdays } from "../../API/leaveCalls";
import { fetchAuthToken } from "../../auth/authToke";
import {
  getNumberOfDays,
  calculateLeaveDuration,
  // Availed,
  Remaining,
  calculateProRataLeave,
} from "../../utils/helpfunctions";
import { toast } from "react-toastify";
import { goBackIcon } from "../../assets/icons";
import MsgModel from "../Model/MsgModel";
import SvgLoading from "../spinners/SvgLoading";
import DatePicker from "react-multi-date-picker";
import { initialDate } from "../../utils/static";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
// import { useDispatch } from "react-redux";
// import { set } from "../../store/loadingSlice";

function LeaveForm({ setRequestLeave, setCounter, leaveData }) {
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const [user] = useState(fetchAuthToken());
  const [leaveType, setLeaveType] = useState(
    leaveData[0].leave_object.leaveName
  );

  const [selectedLeave, setSelectedLeave] = useState(
    leaveData[0].leave_object.leaveName
  );

  const [startDate, setStartDate] = useState(
    new Date().toString().slice(4, 15)
  );
  const [endDate, setEndDate] = useState(new Date().toString().slice(4, 15));
  const [day, setDay] = useState("Full Day");
  const [timeSlot, setTimeSlot] = useState("First Half");
  const [reportingManagers, setReportingManagers] = useState([]);
  const [seniorReportingManagers, setSeniorReportingManagers] = useState([]);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [days_data, setDays_data] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [msg, setMsg] = useState({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [not_applicable, setNot_applicable] = useState(false);
  const [document, setDocument] = useState("");
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    if (
      !user?.reportingManager.length &&
      !user?.seniorReportingManager.length
    ) {
      setNot_applicable(true);
    }
    await getworkdays()
      .then((res) => {
        setDays_data(res.data);
      })
      .catch((err) => {});
    setLoading(false);
    check_leave_data(leaveData[0].leave_object.leaveName);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setDocument(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    const data = {
      leaveType: leaveType,
      startDate: startDate,
      leaveName: selectedLeave.leave_object.leaveName,
      endDate: endDate,
      comments: comments,
      seniorReportingManager: seniorReportingManagers,
      reportingManager: reportingManagers,
      document: document,
    };
    data.status = selectedLeave.leave_object.permissionRequired
      ? "Pending"
      : "Approved";
    if (getNumberOfDays(startDate, endDate) > 0) {
      if (day === "Half Day" && getNumberOfDays(startDate, endDate) === 1) {
        handle_halfDay_request(data);
      } else {
        handle_fullDay_request(data);
      }
    } else {
      setMsg({
        title: "Wrong Input Data",
        description: `Please enter valid dates`,
      });
      setIsOpen(true);
      return;
    }
  };

  const handle_fullDay_request = (data) => {
    let result = calculateLeaveDuration(
      startDate,
      endDate,
      selectedLeave,
      leaveData,
      days_data
    );
    if (result > selectedLeave.leave_object.maxDays) {
      setMsg({
        title: "Leave Application Error.",
        description: `You can request a maximum of ${selectedLeave.leave_object.maxDays} consecutive leave days for ${selectedLeave.leave_object.leaveName} leave type.`,
      });
      setIsOpen(true);
      return;
    }

    if (
      result >
      selectedLeave.leave_object.offDays -
        selectedLeave.leave_object.remaingDays
    ) {
      setMsg({
        title: "Leave Application Error.",
        description: `You have ${Remaining(
          selectedLeave.leave_object
        )} days remaining for ${
          selectedLeave.leave_object.leaveName
        } leave. You cannot apply for more than that.`,
      });
      setIsOpen(true);
      return;
    }

    if (selectedLeave.leave_object.proRata) {
      let pro_rata = calculateProRataLeave(
        selectedLeave.leave_object.offDays,
        user.doj,
        endDate
      );
      if (result > pro_rata) {
        setMsg({
          title: "Leave Application Error.",
          description: `You only have a maximum of ${pro_rata} leave days for ${selectedLeave.leave_object.leaveName} leave type as per Pro-rata policy.`,
        });
        setIsOpen(true);
        return;
      }
    }
    setLoading(true);
    data.numberOfDays = result;

    allowApply(data);
  };
  const handle_halfDay_request = (data) => {
    if (selectedLeave.leave_object.proRata) {
      let pro_rata = calculateProRataLeave(
        selectedLeave.leave_object.offDays,
        user.doj,
        endDate
      );
      if (0.5 > pro_rata) {
        setMsg({
          title: "Cannot Proceed.",
          description: `Sorry, You cannot avail leave. As per pro-rata policy you don't have available leaves for this leave type.`,
        });
        setIsOpen(true);
        return;
      }
    }
    if (
      0.5 >
      selectedLeave.leave_object.offDays -
        selectedLeave.leave_object.remaingDays
    ) {
      setMsg({
        title: "Leave Application Error.",
        description: `You have ${Remaining(
          selectedLeave.leave_object
        )} days remaining for ${
          selectedLeave.leave_object.leaveName
        } leave. You cannot apply for more than that.`,
      });
      setIsOpen(true);
      return;
    }
    setLoading(true);
    data.half_info = timeSlot;
    data.numberOfDays = 0.5;
    allowApply(data);
  };

  const allowApply = async (data) => {
    await requestLeave(data)
      .then((res) => {
        setCounter(Math.random() * 1000);
        setTimeout(() => {
          notify("Leave request submitted successfully!", "success");
        }, 1000);
        setStartDate(new Date().toString().slice(4, 15));
        setEndDate(new Date().toString().slice(4, 15));
        setComments("");
      })
      .catch((error) => {
        notify(error.message, "error");
      });
    setLoading(false);
  };

  const check_leave_data = (leave_type) => {
    const leave_obj = leaveData.find(
      (item) => item.leave_object.leaveName === leave_type
    );

    setSelectedLeave(leave_obj);

    if (
      leave_obj.particular_leave_availed_leangth ===
      leave_obj.leave_object.offDays
    ) {
      const delay = 2000;
      setSubmitDisabled(true);
      setMsg({
        title: "Maximum days reached.",
        description: `Please consider exploring other leave options to proceed with your application.`,
      });
      setTimeout(() => {
        setIsOpen(true);
      }, delay);
    } else {
      setSubmitDisabled(false);
    }
  };

  if (not_applicable) {
    return (
      <div className="bg-gray-100 text-lg p-4 w-fit dark:bg-sfy dark:text-white">
        Sorry! You cannot Book time off, you don't have Reporting and Senior
        Reporting Manager.
      </div>
    );
  }
  return (
    <div
      className={`w-full h-fit md:w-[750px] lg:h-full flex flex-col justify-center items-start text-black dark:text-white duration-500 mt-3`}
    >
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <h1 className="text-[15px] sm:text-[20px] font-[500] text-black dark:text-sfy duration-500">
          Booking Time-Off
        </h1>
        <div
          onClick={() => setRequestLeave(false)}
          className="w-[80px] h-[30px] flex flex-row justify-center items-center cursor-pointer text-black dark:text-sfy duration-500"
        >
          {goBackIcon}
          <button className="mb-[2px]">Back</button>
        </div>
      </div>

      <hr className="w-full mt-4 mb-6 dark:border-black duration-500"></hr>

      {loading && <SvgLoading />}

      {!loading && (
        <form
          id="leaveform"
          className="w-full bg-gray-50 dark:bg-sfy rounded-md h-fit grid grid-cols-1 sm:grid-cols-2 gap-4 p-8"
          onSubmit={handleLeave}
        >
          <div className="w-full h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              User ID
            </label>
            <input
              id="employeeid"
              type="text"
              className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
              value={user.email}
              disabled
            />
          </div>

          <div className="w-full  h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Leave Type
            </label>
            <select
              onChange={(e) => {
                setLeaveType(e.target.value);
                check_leave_data(e.target.value);
              }}
              className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
            >
              {leaveData.map((item) => (
                <option
                  value={item.leave_object.leaveName}
                  key={item.leave_object.leaveName}
                >
                  {item.leave_object.leaveName}
                </option>
              ))}
            </select>
          </div>

          <div className=" w-full h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Availed
            </label>
            <input
              readOnly
              type="text"
              className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
              value={String(selectedLeave?.particular_leave_availed_leangth)}
              disabled
            />
          </div>

          <div className=" w-full h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Remaining
            </label>
            <input
              readOnly
              type="text"
              className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
              value={String(
                selectedLeave?.leave_object?.offDays -
                  selectedLeave?.particular_leave_availed_leangth
              )}
              disabled
            />
          </div>

          <div className="w-full h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Start Date
            </label>
            <DatePicker
              format="MMM DD YYYY"
              inputClass="w-full text-black rounded-[5px] border border-gray-300 outline-none focus:outline-none dark:focus:ring-black dark:focus:border-black bg-gray-50"
              containerClassName="w-full"
              className={theme && "bg-dark"}
              placeholder={initialDate}
              value={new Date(startDate)}
              onChange={(e) => {
                setStartDate(e.toString());
              }}
            />
          </div>

          <div className="w-full h-[70px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              End Date
            </label>
            <DatePicker
              format="MMM DD YYYY"
              inputClass="w-full text-black rounded-[5px] border border-gray-300 outline-none focus:outline-none dark:focus:ring-black dark:focus:border-black bg-gray-50"
              containerClassName="w-full"
              className={theme && "bg-dark"}
              placeholder={initialDate}
              value={new Date(endDate)}
              onChange={(e) => {
                setEndDate(e.toString());
              }}
            />
          </div>

          {selectedLeave.halfDayRequest && (
            <>
              <div
                className={`w-full h-[70px] ${
                  startDate === endDate ? "flex" : "hidden"
                } flex-col justify-around items-start`}
              >
                <label htmlFor="employeeid" className="text-[14px] font-[500]">
                  Day
                </label>
                <select
                  disabled={startDate !== endDate}
                  className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="Full Day">Full Day</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>
              <div
                className={`w-full h-[70px] ${
                  startDate === endDate ? "flex" : "hidden"
                } flex-col justify-around items-start`}
              >
                <label htmlFor="employeeid" className="text-[14px] font-[500]">
                  Time Slot
                </label>
                <select
                  disabled={day === "Full Day"}
                  className="w-full h-[40px] bg-gray-50 rounded-[7px] text-gray-900 text-sm border border-gray-300 pl-[10px]"
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="First Half">First Half</option>
                  <option value="Second Half">Second Half</option>
                </select>
              </div>
            </>
          )}

          <div className="w-full h-[90px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Reporting Manger(s)
            </label>
            <MultiSelect
              options={user?.reportingManager}
              value={reportingManagers}
              onChange={setReportingManagers}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="w-full h-[90px] flex flex-col justify-around items-start">
            <label htmlFor="employeeid" className="text-[14px] font-[500]">
              Senior Reporting Manger(s)
            </label>
            <MultiSelect
              options={user?.seniorReportingManager}
              value={seniorReportingManagers}
              onChange={setSeniorReportingManagers}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          {/* {selectedLeave?.leave_object?.sendDocs && ( */}
          <div className="w-full col-span-1 sm:col-span-2 flex flex-col gap-y-1">
            <label>Document file</label>

            <input
              type="file"
              required
              className="w-full bg-gray-50 border dark:border-none duration-500 rounded-md text-black"
              onChange={handleFileChange}
            />
          </div>
          {/* )} */}

          <div className="w-full h-[220px] col-span-1 sm:col-span-2 flex flex-col justify-around items-center">
            <div className="w-full h-[150px]  flex flex-col justify-start items-start ">
              <label htmlFor="comment" className="text-sm font-[500]">
                Comments to Reporting Manager(s) / HR
              </label>
              <textarea
                id="comment"
                name="comment"
                required
                style={{ resize: "none" }}
                className="w-[100%] h-[100px] rounded-[5px] border border-gray-300 dark:focus:border-black dark:focus:ring-black text-black bg-gray-50 placeholder-gray-400 mt-[10px]"
                placeholder="Write your comments here."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full h-[50px]  flex flex-row justify-between items-center px-[5px]">
              <button
                type="button"
                onClick={() => setRequestLeave(false)}
                className="w-[48%] h-[35px] text-white font-[600] bg-blue-500 rounded-[5px] hover:bg-blue-600 dark:bg-black/60 dark:hover:bg-black duration-500"
              >
                Cancel
              </button>

              <button
                htmlFor="leaveform"
                type="submit"
                className={`w-[48%] h-[35px] text-white font-[600] bg-blue-500 rounded-[5px] hover:bg-blue-600 dark:bg-black/60 dark:hover:bg-black duration-500 ${
                  submitDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={submitDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      <MsgModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={msg.title}
        msg={msg.description}
      />
    </div>
  );
}

export default LeaveForm;
