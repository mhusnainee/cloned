import { useState, useEffect } from "react";
import SvgLoading from "../spinners/SvgLoading";
// import { select } from "../../assets/icons";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import { initialDate } from "../../utils/static";
import { settingWhite, crossWhite } from "../../assets/icons";
import { toast } from "react-toastify";

function Preferences() {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });
  const theme = useSelector(getTheme);

  const [currentPreferences, setCurrentPreferences] = useState({});
  const [formData, setFormData] = useState({
    type: "Flexible",
    morning: true,
    afternoon: true,
    fullDay: false,
    workOnRestDays: false,
    sixDayWorkWeek: false,
    customFixed: true,
    leavePreference: [],
    isExtendedRestDays: false,
    extendedRestDays: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  // const shiftOptions =
  //   companyData.shifts[companyData.types.indexOf(preferences.type)];

  useEffect(() => {
    setIsLoading(true);
    // get preferences of the employee

    setTimeout(() => {
      setCurrentPreferences({
        shiftType: "Flexible",
        shiftPreferences: [
          "Morning 09:00 AM-06:00 PM (M)",
          "Afternoon 01:00 AM-10:00 PM (A)",
        ],
        overtimePreferences: ["Full-day", "6-Day work week"],
        leavePreference: [
          "Sep 25 2023",
          "Sep 26 2023",
          "Sep 27 2023",
          "Sep 28 2023",
          "Sep 29 2023",
          "Sep 30 2023",
          "Oct 01 2023",
        ],
        extendedRestDays: ["Sep 28 2023", "Sep 29 2023", "Oct 01 2023"],
      });
      setIsLoading(false);
    }, 0);
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

  const handleExtended = (e) => {
    if (formData.leavePreference.length === 0) {
      notify(
        "Leave preferences is not selected, please select it first!",
        "error"
      );
      setFormData({ ...formData, extendedRestDays: [] });
      return;
    }

    let result = true;
    const selected = e[e.length - 1];

    if (e.length > formData.extendedRestDays.length) {
      formData.leavePreference.map((range) => {
        if (range[1] - range[0] === 0) {
          if (range[0].toString() === selected.toString()) {
            result = true;
          } else {
            result = false;
          }
        } else {
          if (
            range[0].toString() === selected.toString() ||
            range[1].toString() === selected.toString() ||
            (selected > range[0] && selected < range[1])
          ) {
            result = true;
          } else {
            result = false;
          }
        }
        return range;
      });
    } else {
      setFormData({ ...formData, extendedRestDays: e });
    }

    if (result) {
      setFormData({
        ...formData,
        extendedRestDays: e,
      });
    } else {
      notify("Selected date is out of range of leave preferences!", "error");
      setFormData({
        ...formData,
        extendedRestDays: formData.extendedRestDays,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      {isLoading && <SvgLoading />}

      {!isLoading && (
        <div className="w-full md:w-[750px] flex flex-col text-[14px] sm:text-[16px] text-black dark:text-white bg-gray-50 dark:bg-sfy rounded-lg duration-500 p-4 md:p-8">
          <div className="w-full text-lg md:text-2xl pb-2 border-b-2 dark:border-b-white/50 flex justify-between items-center">
            <h5>Current preferences</h5>
            <button className="cursor-pointer" onClick={handelEnable}>
              {isEdit ? crossWhite : settingWhite}
            </button>
          </div>

          {/* Current preferences */}
          <div className="w-full flex flex-col gap-y-4 my-6 py-4">
            <div className="w-full flex border-b dark:border-b-white/20 pb-1 flex-row justify-between">
              <h1>Shift type preference:</h1>
              <h1>{currentPreferences?.shiftType}</h1>
            </div>

            <div className="w-full">
              <div className="w-full border-b dark:border-b-white/20 pb-1">
                <h1>Shift preferences:</h1>
              </div>

              {currentPreferences?.shiftPreferences?.map((shift, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between mt-1"
                >
                  <h1>{shift}</h1>
                  <input
                    disabled
                    type="checkbox"
                    checked
                    className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                  />
                </div>
              ))}
            </div>

            <div className="w-full">
              <div className="w-full border-b dark:border-b-white/20 pb-1">
                <h1>Overtime preferences</h1>
              </div>

              {currentPreferences?.overtimePreferences?.map(
                (overtime, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-row justify-between mt-1"
                  >
                    <h1>{overtime}</h1>
                    <input
                      disabled
                      type="checkbox"
                      checked
                      className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                    />
                  </div>
                )
              )}
            </div>

            <div className="w-full">
              <div className="w-full border-b dark:border-b-white/20 pb-1">
                <h1 className="h-fit">Leave preferences</h1>
              </div>

              <div className="w-full flex flex-wrap justify-start gap-2 mt-2">
                {currentPreferences?.leavePreference?.map(
                  (preference, index) => (
                    <h1
                      className="px-1 text-xs border text-black/50 dark:text-white/50 dark:border-white/50 rounded-md"
                      key={index}
                    >
                      {preference}
                    </h1>
                  )
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="w-full border-b dark:border-b-white/20 pb-1">
                <h1 className="h-fit">Extended rest days</h1>
              </div>

              <div className="w-full flex flex-wrap justify-start gap-2 mt-2">
                {currentPreferences?.extendedRestDays?.map((day, index) => (
                  <h1
                    className="px-1 text-xs border text-black/50 dark:text-white/50 dark:border-white/50 rounded-md"
                    key={index}
                  >
                    {day}
                  </h1>
                ))}
              </div>
            </div>
          </div>

          {/* Form preferences */}
          <div className="w-full text-lg md:text-2xl pb-2 border-b-2 dark:border-b-white/50 flex justify-between items-center">
            <h5>Select your preferences</h5>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`mt-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ${
              !isEdit && "opacity-50"
            }`}
            title={!isEdit ? "Press settings Icon to enable editing" : ""}
          >
            {/* Shift type => Flexible or Inflexible */}
            <div className="col-span-2 flex flex-col gap-y-1">
              <label>Shift type</label>
              <select
                disabled={!isEdit}
                className="w-full h-[40px] bg-gray-50 rounded-md text-gray-900 text-sm border dark:focus:border-black dark:focus:ring-black border-gray-300 pl-[10px] my-[5px]"
                value={formData.type}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  });
                }}
              >
                <option
                  value="Flexible"
                  className="dark:bg-black dark:text-white"
                >
                  Flexible
                </option>

                <option
                  value="Inflexible"
                  className="dark:bg-black dark:text-white"
                >
                  Inflexible
                </option>
              </select>

              {formData.type === "Flexible" ? (
                <>
                  <div className="w-full flex flex-row justify-between items-center">
                    <label>1. Morning 09:00 AM-06:00 PM (M)</label>
                    <input
                      disabled={true}
                      type="checkbox"
                      className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                      checked={true}
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between items-center">
                    <label>2. Afternoon 01:00 AM-10:00 PM (A)</label>
                    <input
                      disabled={true}
                      type="checkbox"
                      className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                      checked={true}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="w-full border-b dark:border-b-white/20 pb-1">
                      <h1 className="h-fit">3. Overtime preferences</h1>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center mt-1">
                      <label>(a) Full-day</label>
                      <input
                        disabled={!isEdit}
                        type="checkbox"
                        className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        checked={formData.fullDay || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullDay: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-between items-center mt-1">
                      <label>(b) 6-Day work week</label>
                      <input
                        disabled={!isEdit}
                        type="checkbox"
                        className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        checked={formData.sixDayWorkWeek || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sixDayWorkWeek: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-between items-center mt-1">
                      <label>(c) Work on rest day(s)</label>
                      <input
                        disabled={!isEdit}
                        type="checkbox"
                        className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        checked={formData.workOnRestDays || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workOnRestDays: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-row justify-between items-center">
                  <label>1. Custom fixed shift 11:00 AM-08:00 PM (C1)</label>
                  <input
                    disabled={true}
                    type="checkbox"
                    className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                    checked={true}
                  />
                </div>
              )}
            </div>

            <div className={`col-span-2 flex flex-col`}>
              <label className="w-full mb-2">Leave preference</label>

              <DatePicker
                required
                multiple
                range
                disabled={!isEdit}
                value={formData.leavePreference}
                placeholder={initialDate}
                onChange={(e) =>
                  setFormData({ ...formData, leavePreference: e })
                }
                format="MMM DD YYYY"
                sort
                plugins={[<DatePanel />]}
                inputClass="w-full bg-gray-50 rounded-[5px] text-black border border-gray-300 duration-500 outline-none dark:focus:border-black dark:focus:ring-black focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
                className={theme && "bg-dark"}
              />
            </div>

            <div className="col-span-2 flex flex-row justify-between items-center">
              <label>Extended rest day(s)</label>
              <input
                disabled={!isEdit}
                type="checkbox"
                className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                checked={formData.isExtendedRestDays}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isExtendedRestDays: e.target.checked,
                  })
                }
              />
            </div>

            {formData.isExtendedRestDays && (
              <div className="col-span-2 flex flex-col">
                <DatePicker
                  required={formData.isExtendedRestDays}
                  multiple
                  disabled={!isEdit}
                  value={formData?.extendedRestDays?.map(
                    (date) => new Date(date)
                  )}
                  placeholder={initialDate}
                  onChange={handleExtended}
                  format="MMM DD YYYY"
                  plugins={[<DatePanel />]}
                  inputClass="w-full bg-gray-50 rounded-[5px] text-black border border-gray-300 duration-500 outline-none dark:focus:border-black dark:focus:ring-black focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
                  className={theme && "bg-dark w-full"}
                />
              </div>
            )}

            <button
              disabled={!isEdit}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-black/60 dark:hover:bg-black rounded-md p-2 duration-500 text-white col-span-2 mt-4"
            >
              Submit preferences
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Preferences;
