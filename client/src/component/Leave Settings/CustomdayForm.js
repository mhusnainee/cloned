import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import { datePlaceHolder } from "../../utils/static";
import {
  goBackIcon,
  storage,
  deleteIcon,
  loadingSvg,
} from "../../assets/icons";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";
import FloatingMessage from "./FloatingMessage";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {
  add_Custom_Leaveday,
  delete_custom_leave,
  update_customLeave,
} from "../../API/leaveCalls";

function CustomdayForm({
  mode,
  data,
  setShowCustomForm,
  setSelectedDay,
  setData,
  setReload,
}) {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const theme = useSelector(getTheme);

  const initialDate = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(",", "");

  const [customDayInfo, setCustomDayInfo] = useState({
    name: "",
    offDate: initialDate,
    description: "",
    days: 1,
    multiDates: [],
    picture: "",
  });

  const [open, setOpen] = useState(false);
  const [isMultiDates, setIsMultiDates] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (mode === "update") {
      set_selectedDay_();
    }
  }, []);

  const set_selectedDay_ = () => {
    setCustomDayInfo({
      _id: data._id,
      name: data.name,
      offDate: data?.offDate,
      description: data.description,
      days: data.days,
      multiDates: data.multiDates,
      picture: data.picture,
    });
    setIsMultiDates(data?.multiDates.length > 0 ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = customDayInfo;
    if (isMultiDates) {
      let nearrr = customDayInfo.multiDates.map((timestamp) => {
        if (typeof timestamp !== "string") {
          return `${timestamp.month.shortName} ${timestamp.day} ${timestamp.year}`;
        } else {
          return timestamp;
        }
      });
      data.multiDates = nearrr;
    }

    if (mode === "update") {
      await update_customLeave(customDayInfo)
        .then((res) => {
          if (res.data.success) {
            setData(res.data.updatedData);
            setSelectedDay("");
            setloading(false);
            notify("Public holiday Updated successfully!", "success");
          }
          setReload(Math.random());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await add_Custom_Leaveday(data)
        .then((res) => {
          if (res.data.success) {
            notify("Public holiday Added successfully!", "success");
            setShowCustomForm(false);
            setloading(false);
            setData(res.data.updatedData);
          }
          setReload(Math.random());
        })
        .catch((error) => {
          notify(error, "error");
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setCustomDayInfo({
          ...customDayInfo,
          picture: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    setloading(true);
    setOpen(false);

    await delete_custom_leave(customDayInfo?._id)
      .then((res) => {
        setSelectedDay("");
        setData(res.data.updatedData);
        notify("Public holiday deleted successfully!", "success");
        setReload(Math.random());
      })
      .catch((error) => {
        notify(error, "error");
      });
  };

  const handleStartDateChange = (e) => {
    setCustomDayInfo({
      ...customDayInfo,
      offDate: `${e.month.shortName} ${e.day} ${e.year}`,
    });
  };

  const handle_date_picker = (e) => {
    setCustomDayInfo({
      ...customDayInfo,
      multiDates: e,
      days: e.length,
    });
  };

  const handle_change = (e) => {
    setIsMultiDates(e.target.checked);
  };
  const handle_input_change = (e) => {
    const { name, value } = e.target;
    setCustomDayInfo({ ...customDayInfo, [name]: value });
  };
  return (
    <>
      <div
        className={`${
          mode === "update" ? "w-full md:w-[750px]" : "w-full md:w-[500px]"
        } h-fit flex flex-col text-[12px] sm:text-[16px]`}
      >
        {mode !== "update" && (
          <div className="w-full h-[65px] border-b dark:border-b-black duration-500 dark:text-sfy mb-[10px] flex flex-row items-center justify-between">
            <h3 className="text-[20px] mb-[3px]">Add public holiday</h3>
            <button
              onClick={() => {
                setSelectedDay("");
                setShowCustomForm(false);
              }}
              className="flex items-center border border-gray-200 dark:border-sfy px-2 py-1 hover:bg-gray-100 dark:hover:bg-sfy/20 rounded-md duration-500"
            >
              {goBackIcon} Back
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full h-fit bg-gray-100 duration-500 dark:bg-sfy rounded-[5px] flex flex-col justify-start items-center p-[15px] sm:p-[30px]"
        >
          <label
            htmlFor="holidayName"
            className="w-full dark:text-white duration-500"
          >
            Holiday name
          </label>
          <input
            id="holidayName"
            // type="text"
            name="name"
            autoComplete="off"
            required
            className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] px-[10px] bg-white duration-500 outline-none focus:outline-none mt-[5px]"
            placeholder="Enter day name"
            value={customDayInfo?.name}
            onChange={(e) => handle_input_change(e)}
          />

          <FloatingMessage
            label={"Select Multiple Days"}
            name="multipleDays"
            message="If enabled, the user can select multiple days."
            checked={isMultiDates}
            handleChange={handle_change}
          />

          <div
            className={`w-full overflow-hidden flex flex-col duration-500 ${
              isMultiDates ? "h-[130px] mt-[10px] p-[1px]" : "h-0"
            }`}
          >
            <DatePicker
              multiple
              disabled={!isMultiDates}
              value={customDayInfo?.multiDates}
              placeholder={datePlaceHolder}
              onChange={handle_date_picker}
              format="MMM DD YYYY"
              sort
              plugins={[<DatePanel />]}
              inputClass="w-full rounded-[5px] border border-gray-300 duration-500 outline-none focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
              className={theme && "bg-dark"}
            />
            <label
              htmlFor="days"
              className="w-full mt-[10px] dark:text-white duration-500"
            >
              Days
            </label>
            <input
              disabled
              className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] px-[10px] bg-white duration-500 outline-none focus:outline-none mt-[5px]"
              placeholder="Allowance days per year e.g 14, 10.5 "
              value={customDayInfo.days}
            />
          </div>

          <div
            className={`w-full overflow-hidden flex flex-col duration-500 ${
              isMultiDates ? "h-0" : "h-[95px] p-[1px]"
            }`}
          >
            <label className="relative w-full mt-[10px] mb-2 dark:text-white duration-500">
              Select Date
            </label>

            <DatePicker
              value={customDayInfo?.offDate}
              disabled={isMultiDates}
              placeholder={datePlaceHolder}
              onChange={(e) => handleStartDateChange(e)}
              format="MMM DD YYYY"
              sort
              inputClass="w-full rounded-[5px] mt-[5px] border border-gray-300 duration-500 outline-none focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
              className={theme && "bg-dark"}
            />
          </div>

          <label
            htmlFor="comment"
            className="w-full mt-[10px] dark:text-white duration-500"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            style={{ resize: "none" }}
            className="text-black w-[100%] h-[100px] rounded-[5px] border border-gray-300 duration-500 outline-none focus:outline-none mt-[5px]"
            placeholder="description"
            value={customDayInfo?.description}
            onChange={(e) => handle_input_change(e)}
          />

          <label
            htmlFor="picture"
            className="w-full max-h-[70px] mt-[10px] text-black dark:text-white duration-500"
          >
            Picture
          </label>
          <input
            type="file"
            name="picture"
            onChange={(e) => handleFileChange(e)}
            className="bg-white w-full rounded-[5px] text-black border focus:border-blue-700 focus:ring-1 focus:ring-blue-700 border-gray-300 dark:border-none duration-500"
          />

          {loading ? (
            <>
              <button
                type="submit"
                className={`w-full h-[35px] duration-500 rounded-[5px] text-white bg-blue-700 hover:bg-blue-800 dark:bg-black/60 dark:hover:bg-black mt-[20px] flex flex-row justify-center items-center`}
                disabled={true}
              >
                <h1 className="flex items-center justify-center">
                  {" "}
                  {loadingSvg}
                  {" please wait "}
                </h1>
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className={`w-full h-[35px] duration-500 rounded-[5px] text-white bg-blue-700 hover:bg-blue-800 dark:bg-black/60 dark:hover:bg-black mt-[20px] flex flex-row justify-center items-center`}
                disabled={loading}
              >
                {mode === "update" ? (
                  <h1 className="flex items-center justify-center">
                    {storage} Update public holiday
                  </h1>
                ) : (
                  <h1 className="flex items-center justify-center">
                    {storage} Create public holiday
                  </h1>
                )}
              </button>

              {mode === "update" && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className={`w-full h-[35px] duration-500 rounded-[5px] text-white bg-red-700 flex hover:bg-red-800 dark:bg-black/60 dark:hover:bg-black dark:text-red-600 mt-[20px] flex-row justify-center items-center`}
                  disabled={loading}
                >
                  <h1 className="flex items-center justify-center">
                    {deleteIcon}
                    <span className="ml-[5px]">Delete</span>
                  </h1>
                </button>
              )}
            </>
          )}
        </form>
      </div>

      {mode === "update" && (
        <ConfirmModal
          open={open}
          message="Do you really want to delete?"
          yes={handleDelete}
          no={setOpen}
        />
      )}
    </>
  );
}

export default CustomdayForm;
