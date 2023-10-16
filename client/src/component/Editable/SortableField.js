import React, { useState } from "react";
import { deleteIcon, editIconSettings, settingsIcon } from "../../assets/icons";
import { MultiSelect } from "react-multi-select-component";
import { set_reportingManager } from "../../API/documentCalls";
import Ovalspinner from "../spinners/Ovalspinner";
import { toast } from "react-toastify";
import ConfirmModal from "../../component/ConfirmModal";
const SortableField = ({
  title,
  data,
  setData,
  optionss,
  email,
  setReload,
}) => {
  const [allowChange, setAllowChange] = useState(false);
  const [spinnerIsOn, setspinnerIsOn] = useState(false);
  const [temData, settemData] = useState(data);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setselectedIndex] = useState();
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handle_Save = async () => {
    setAllowChange(false);
    setspinnerIsOn(true);
    const newdata = {
      email: email,
      rmdata: temData,
    };
    await set_reportingManager(newdata, title)
      .then((res) => {
        console.log(res);
        notify("Added successfully!", "success");
        setspinnerIsOn(false);
        setData(res.data?.managers);
      })
      .catch((error) => {
        notify(error.message, "error");
      });
  };
  const handleDelete = () => {
    const newArray = temData.filter((item, index) => index !== selectedIndex);
    settemData(newArray);
    setOpen(false);
  };

  if (spinnerIsOn) {
    return <Ovalspinner display={spinnerIsOn} />;
  }

  return (
    <div>
      <div className="flex flex-row w-full items-start justify-between text-black dark:text-sfy duration-500">
        <div className="mb-10">{title}</div>
        <div
          className="cursor-pointer "
          onClick={() => setAllowChange(!allowChange)}
        >
          {settingsIcon}
        </div>
      </div>

      {allowChange && (
        <div>
          <h1>Select to Add {title}</h1>
          <MultiSelect
            options={optionss}
            value={temData}
            onChange={settemData}
            className="bg-gray-50 border dark:bg-sfy border-gray-300 dark:border-sfy text-sm rounded-lg block w-full mt-1 mb-10 p-2"
          />
        </div>
      )}

      {temData && temData.length > 0 ? (
        <div>
          {temData.map((item, index) => (
            <div
              className=" flex items-center space-x-2 mb-2 w-full max-w-[400px]"
              key={index}
            >
              <div className="bg-gray-100 dark:bg-sfy duration-500 text-black dark:text-white p-2 rounded-md w-full">
                {item.value}
              </div>
              {allowChange && (
                <div
                  onClick={() => {
                    setOpen(true);
                    setselectedIndex(index);
                  }}
                  className="text-black dark:text-sfy duration-500"
                >
                  {deleteIcon}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <div>
            <h1 className="text-md">
              This user don't have any Reporting Manager. Select Reporting
              Manager from the List.
            </h1>
          </div>
        </div>
      )}

      <div className="flex space-x-2 items-center mb-4 mt-4">
        {allowChange && (
          <>
            <button
              type="button"
              className="border dark:border-sfy font-medium text-sm text-gray-500 dark:text-sfy p-2 w-fit rounded-md hover:bg-slate-300 dark:hover:bg-sfy/20 duration-500"
              onClick={() => {
                handle_Save();
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="border dark:border-sfy font-medium text-sm text-gray-500 dark:text-sfy p-2 w-[70px] rounded-md hover:bg-slate-300 dark:hover:bg-sfy/20 duration-500"
              onClick={() => {
                setAllowChange(false);
                settemData(data);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <ConfirmModal
        open={open}
        message="Are you sure you wany to delete?"
        yes={handleDelete}
        no={setOpen}
      />
    </div>
  );
};

export default SortableField;
