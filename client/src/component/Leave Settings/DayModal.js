import { crossWhite } from "../../assets/icons";
import TopModal from "../TopModal";
import { toast } from "react-toastify";
import { update_weekDays_halfDays } from "../../API/leaveCalls";
import { useState } from "react";
function DayModal({
  selectedDay,
  setSelectedDay,
  setReload,
  halfDays,
  fullDays,
}) {
  const [submit, setSubmit] = useState(false);
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleSave = async () => {
    setSubmit(true);
    let { success } = await update_weekDays_halfDays(selectedDay);
    if (success) {
      setReload(Math.random());
      setSelectedDay("");
      setSubmit(false);
      notify("Weekday updated successfully!", "success");
    } else {
      notify("Something went wrong!", "try again");
    }
  };

  return (
    <TopModal open={selectedDay}>
      <div className="relative w-[320px] sm:w-[400px] md:w-[550px] grid grid-cols-2 duration-500 bg-slate-200 dark:bg-sfy rounded-[5px] p-[10px] sm:p-[30px] shadow-black/40 shadow-lg mb-[20px]">
        <div className="w-full h-fit col-span-2 mb-[20px] flex flex-row justify-between items-center text-black dark:text-white duration-500">
          <h1 className="text-[20px]">{selectedDay?.name}</h1>
          <button onClick={() => setSelectedDay("")}>{crossWhite}</button>
        </div>

        <input
          type="checkbox"
          className="sr-only peer"
          id={selectedDay?.name}
          checked={selectedDay?.status || false}
          onChange={(e) =>
            setSelectedDay({
              ...selectedDay,
              status: e.target.checked,
            })
          }
        />

        <h1 className="flex items-center place-self-start text-black dark:text-white duration-500">
          Working day
        </h1>

        <label
          htmlFor={selectedDay?.name}
          className="relative place-self-end duration-500 cursor-pointer w-11 h-6 bg-slate-400 dark:bg-black rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white dark:after:bg-sfy after:rounded-full after:h-5 after:w-5 after:duration-500 peer-checked:bg-blue-600 dark:peer-checked:bg-white"
        ></label>

        <div className="w-full col-span-2 mt-[10px] overflow-hidden rounded-[5px] duration-[400ms] h-0 peer-checked:h-[80px] text-black dark:text-white">
          <div className="md:p-4 h-full flex flex-col justify-center items-center text-[12px] sm:text-[16px]">
            <div className="w-full h-[30px] flex flex-row justify-around items-center">
              <h1>Work schedule :</h1>
              <fieldset className="w-fit flex flex-row justify-around items-center px-[10px]">
                <label className="mr-8">
                  Full day
                  <input
                    type="radio"
                    name={selectedDay?.name}
                    className="ml-[10px]"
                    checked={selectedDay?.schedule === "fullday"}
                    value="fullday"
                    onChange={(e) =>
                      setSelectedDay({
                        ...selectedDay,
                        schedule: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Half day
                  <input
                    type="radio"
                    name={selectedDay?.name}
                    className="ml-[10px]"
                    checked={selectedDay?.schedule === "halfday"}
                    value="halfday"
                    onChange={(e) =>
                      setSelectedDay({
                        ...selectedDay,
                        schedule: e.target.value,
                      })
                    }
                  />
                </label>
              </fieldset>
            </div>
          </div>
        </div>

        <button
          disabled={submit}
          onClick={handleSave}
          className="col-span-2 h-[30px] sm:h-[40px] bg-slate-400/50 text-black dark:bg-black/80 dark:hover:bg-black duration-500 dark:text-white hover:bg-slate-500/50 mt-[20px] rounded-[5px]"
        >
          {submit ? "Please wait" : "Save"}
        </button>
      </div>
    </TopModal>
  );
}

export default DayModal;
