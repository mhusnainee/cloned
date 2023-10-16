import React from "react";
import { useState, useEffect } from "react";
import { settingWhite, crossWhite, loadingSvg } from "../../assets/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import DatePicker from "react-multi-date-picker";
import { initialDate } from "../../utils/static";
import SvgLoading from "../spinners/SvgLoading";

const LeaveCalendar = React.memo(function LeaveCalendar() {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });
  const theme = useSelector(getTheme);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);

  useEffect(() => {
    setGetLoading(true);
    // get current startDate and endDate values

    setTimeout(() => {
      setStartDate("Jan 01 2023");
      setEndDate("Dec 30 2023");
      // notify("An error occoured getting leave calendar settings!", "error");
      setGetLoading(false);
    }, 1000);
  }, []);

  const handelEnable = () => {
    if (isEdit) {
      setIsEdit(false);
      notify("Editing disabled!", "success");
    } else {
      setIsEdit(true);
      notify("Editing enabled!", "success");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProcessLoading(true);

    setTimeout(() => {
      console.log("Leave calendar settings submitted");
      notify("Leave calendar settings submitted successfully!", "success");
      // notify("An error occoured submitting settings!", "error");
      setProcessLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full md:w-[750px] h-fit p-4 sm:p-8 flex flex-col bg-gray-50 dark:bg-sfy text-black dark:text-white duration-500 rounded-md">
      <div className="w-full flex flex-row justify-between items-center p-2">
        <h1 className="text-lg font-semibold">Leave calendar settings</h1>
        <button onClick={handelEnable}>
          {isEdit ? crossWhite : settingWhite}
        </button>
      </div>

      {getLoading && <SvgLoading />}

      {!getLoading && (
        <form
          onSubmit={handleSubmit}
          className={`mt-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ${
            !isEdit && "opacity-50"
          }`}
          title={!isEdit ? "Press settings Icon to enable editing" : ""}
        >
          <div className={`w-full flex flex-col p-1`}>
            <label className="w-full mb-2">Start date</label>

            <DatePicker
              required
              disabled={!isEdit}
              value={new Date(startDate)}
              placeholder={initialDate}
              onChange={(e) => setStartDate(e.toDate())}
              format="MMM DD YYYY"
              inputClass="w-full bg-gray-50 rounded-[5px] text-black border border-gray-300 duration-500 outline-none dark:focus:border-black dark:focus:ring-black focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
              className={theme && "bg-dark"}
            />
          </div>

          <div className={`w-full flex flex-col p-1`}>
            <label className="w-full mb-2">End date</label>

            <DatePicker
              required
              disabled={!isEdit}
              value={new Date(endDate)}
              placeholder={initialDate}
              onChange={(e) => setEndDate(e.toDate())}
              format="MMM DD YYYY"
              inputClass="w-full bg-gray-50 rounded-[5px] text-black border border-gray-300 duration-500 outline-none dark:focus:border-black dark:focus:ring-black focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
              className={theme && "bg-dark"}
            />
          </div>

          <button
            disabled={processLoading || !isEdit}
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 dark:bg-black/60 dark:hover:bg-black rounded-md p-2 duration-500 text-white col-span-1 sm:col-span-2 mt-4"
          >
            {processLoading && loadingSvg}
            Submit
          </button>
        </form>
      )}
    </div>
  );
});

export default LeaveCalendar;
