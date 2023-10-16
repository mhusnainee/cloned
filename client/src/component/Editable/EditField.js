import React, { useState } from "react";
import { editIconSettings, xmark } from "../../assets/icons";
import { set_editFields } from "../../auth/authService";
import { loadingSvg } from "../../assets/icons";
import { toast } from "react-toastify";

const EditField = ({ fieldName, fieldValue, dbName, email, recallData }) => {
  const [editField, setEditField] = useState(false);
  const [value, setValue] = useState(fieldValue);
  const [isChanging, setIsChanging] = useState(false);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleSave = async () => {
    if (value !== "" || value !== null) {
      setEditField(!editField);
      setIsChanging(true);
      const data = {
        fieldName: dbName,
        fieldValue: value,
        email,
      };
      await set_editFields(data)
        .then((res) => {
          setIsChanging(false);
          notify("Designation updated successfully!", "success");
          recallData();
        })
        .catch((error) => {
          notify(error.message, "error");
        });
    } else {
      notify("Please Enter correct data!", "error");
    }
  };

  return (
    <div className="w-full mt-4">
      <label htmlFor="name" className="block mb-2 text-sm font-medium">
        <h1 className="text-black dark:text-sfy duration-500">{fieldName}</h1>
      </label>
      {!isChanging && (
        <div className="flex items-center space-x-2">
          <input
            disabled={editField === false ? true : false}
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            className={`border-transparent bg-gray-50 dark:bg-sfy text-gray-900 dark:text-white duration-500 text-sm rounded-lg block w-full sm:w-[300px] p-2.5 `}
          />

          {!editField && (
            <div
              className={`text-black dark:text-sfy hover:text-sfy dark:hover:text-black duration-500 cursor-pointer`}
              onClick={() => setEditField(!editField)}
            >
              {editIconSettings}
            </div>
          )}

          {editField && (
            <>
              <div
                className={`text-black dark:text-sfy hover:text-sfy dark:hover:text-black duration-500 cursor-pointer`}
                onClick={() => {
                  setEditField(!editField);
                  setValue(fieldValue);
                }}
              >
                {xmark}
              </div>

              <button
                type="button"
                className="border font-medium text-sm text-gray-500 px-2 dark:bg-black/80 dark:text-white py-1 rounded-md hover:bg-slate-300 dark:hover:bg-black duration-500"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </>
          )}
        </div>
      )}

      {
        isChanging && loadingSvg
        // <div>
        //   <h1>Please wait, this may take a while</h1>
        // </div>
      }
    </div>
  );
};

export default EditField;
