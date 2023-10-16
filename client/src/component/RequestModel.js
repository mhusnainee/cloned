import React, { useState, useEffect } from "react";
// import Datepicker from "tailwind-datepicker-react";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { getTheme } from "../store/themeSlice";

const RequestModel = ({
  closeModal,
  isModalOpen,
  selectedRow,
  handleUpdate,
}) => {
  const theme = useSelector(getTheme);

  const [data, seTdata] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    seTdata(selectedRow);
  }, [selectedRow]);

  const handleClose = (state) => {
    setShow(state);
  };

  if (!isModalOpen && !selectedRow) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto overflow-x-auto sm:mx-6">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-sfy text-gray-900 dark:text-white duration-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
            <div className="flex flex-col items-center justify-center ">
              <div className="border-b pb-4">
                <h1 className="text-xl">Edit Document</h1>
              </div>
              <div className="mt-2 w-[250px] sm:w-full md:px-6 p-4 mx-auto grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Document Name
                  </label>
                  <input
                    disabled={!isEdit}
                    onChange={(e) => {
                      seTdata((data) => {
                        return { ...data, documentName: e.target.value };
                      });
                    }}
                    value={data?.documentName ? data.documentName : ""}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 dark:focus:ring-black focus:border-primary-600 dark:focus:border-black dark:focus:outline-none block w-full p-2.5 "
                    placeholder="cnic"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Send to
                  </label>
                  <select
                    disabled={!isEdit}
                    value={data?.email ? data.email : ""}
                    onChange={(e) => {
                      seTdata((data) => {
                        return { ...data, email: e.target.value };
                      });
                    }}
                    id="default"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 dark:focus:ring-black focus:border-blue-500 dark:focus:border-black block w-full p-2.5 "
                  >
                    <option>Select Employee</option>
                    <option value="umairkhanu07@gmail.com">
                      umairkhanu07@gmail.com
                    </option>
                    <option value="umairkhanu08@gmail.com">
                      umairkhanu08@gmail.com
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Document Note
                  </label>
                  <textarea
                    value={data?.note ? data.note : ""}
                    disabled={!isEdit}
                    onChange={(e) => {
                      seTdata((data) => {
                        return { ...data, note: e.target.value };
                      });
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                    placeholder="front & back, black & white"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col mb-4 mx-auto p-4 sm:p-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Pick Due date
                </label>
                <DatePicker
                  disabled={!isEdit}
                  id="dueDate"
                  value={new Date(data?.dueDate)}
                  placeholder={new Date()}
                  onChange={(e) =>
                    seTdata((data) => {
                      return {
                        ...data,
                        dueDate:
                          e.weekDay.shortName +
                          " " +
                          e.month.shortName +
                          " " +
                          e.day +
                          " " +
                          e.year,
                      };
                    })
                  }
                  format="MMM DD YYYY"
                  inputClass="w-full bg-gray-50 rounded-[5px] mt-[5px] border border-gray-300 duration-500 outline-none dark:focus:ring-black dark:focus:border-black text-gray-900 focus:outline-none text-[12px] sm:text-[16px] placeholder:text-[12px] sm:placeholder:text-[16px]"
                  className={theme && "bg-dark"}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-black duration-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
            {!isEdit && (
              <button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Edit
              </button>
            )}

            {isEdit && (
              <button
                onClick={() => {
                  setIsEdit(false);
                  handleUpdate(data);
                }}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
            )}
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setIsEdit(false);
                closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModel;
