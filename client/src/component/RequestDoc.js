import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { newDoc } from "../API/documentCalls";
import RequestModel from "./RequestModel";
import { MultiSelect } from "react-multi-select-component";
import { get_users } from "../auth/authService";
import { fetchAuthToken } from "../auth/authToke";
import { loadingSvg } from "../assets/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTheme } from "../store/themeSlice";

const RequestDoc = ({ selectedPerson }) => {
  console.log("doc");

  const theme = useSelector(getTheme);

  const [requests, setRequests] = useState([]);
  const [options, setOptions] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [note, setNote] = useState("");
  const [sendTo, setSendTo] = useState(selectedPerson?.email);
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [index, setindex] = useState();
  const [sending, setSending] = useState(false);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await get_users().then((res) => {
      let dropdownData = res.data.map((item) => {
        return { label: item.email, value: item.email };
      });
      setOptions(dropdownData);
    });
  };

  const handleSubmit = () => {
    handleAddNew();
    send(requests);
  };
  const send = async (data) => {
    setSending(true);
    await newDoc(data)
      .then((res) => {
        if (res.data.success) {
          notify("Documents requested successfully!", "success");
          setRequests([]);
          setSending(false);
        } else {
          notify("Something bad happened!", "error");
        }
      })
      .catch((error) => {
        setSending(false);
        notify(error.message, "error");
      });
  };
  const handleAddNew = () => {
    if (documentName && note && value.startDate && value.endDate) {
      let user = fetchAuthToken();
      let data = {
        documentName: documentName,
        note: note,
        email: sendTo,
        verified: false,
        assignee: sendTo,
        assigner: user.email,
        followers: selected,
        dueDate: value.endDate,
      };
      setRequests([...requests, data]);
      setDocumentName("");
      setSendTo("");
      setNote("");
    }
  };

  const handleUpdate = (data) => {
    setRequests((requests) =>
      requests.map((item, i) => (i === index ? { ...data } : { ...item }))
    );
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setindex(null);
  };

  return (
    <div className="w-full text-black dark:text-sfy duration-500">
      <div className="w-full rounded-md">
        <div className="flex flex-col ">
          <div className="border-b-2 dark:border-b-black duration-500 pb-2">
            <div className="w-full flex items-center justify-between">
              <div>
                <h1 className="text-xl">Request Document</h1>
              </div>
              <div>
                {!sending && requests.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-blue-700 dark:bg-black/80 hover:bg-blue-800 dark:hover:bg-black focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 duration-500 items-center w-[130px] "
                  >
                    Send Request(s)
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2 w-[250px] sm:w-full md:px-6 mx-auto grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Document Name
              </label>
              <input
                onChange={(e) => setDocumentName(e.target.value)}
                value={documentName}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 dark:border-sfy text-gray-900 dark:placeholder-white/70 dark:text-white text-sm rounded-lg focus:ring-primary-600 dark:focus:ring-black focus:border-primary-600 dark:focus:border-black block w-full p-2.5 duration-500"
                placeholder="cnic"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Send to
              </label>
              <input
                disabled
                value={selectedPerson.email}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 dark:border-sfy text-gray-900 dark:placeholder-white/70 dark:text-white text-sm rounded-lg focus:ring-primary-600 dark:focus:ring-black focus:border-primary-600 dark:focus:border-black block w-full p-2.5 duration-500"
                placeholder="cnic"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Document Note
              </label>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 dark:border-sfy text-gray-900 dark:placeholder-white/70 dark:text-white text-sm rounded-lg focus:ring-primary-600 dark:focus:ring-black focus:border-primary-600 dark:focus:border-black block w-full p-2.5 duration-500"
                placeholder="front & back, black & white"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Followers
              </label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                className="bg-gray-50 dark:dark dark:bg-sfy border border-gray-300 dark:border-sfy text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>
          <div className="w-[250px] sm:w-full md:px-6 py-4 mx-auto">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Pick Due date
            </label>
            <Datepicker
              value={value}
              onChange={(vl) => setValue(vl)}
              showShortcuts={false}
              popoverDirection="down"
              primaryColor={theme && "rose"}
              inputClassName="relative dark:!bg-sfy dark:!border-sfy dark:!text-white dark:placeholder:text-white/70 dark:focus:ring-black duration-500 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:text-white rounded-lg text-sm placeholder-gray-500 bg-gray-50"
              containerClassName="relative w-full"
              toggleClassName="absolute right-0 h-full px-3 text-gray-400 dark:text-white/70"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center mx-auto w-[250px] sm:w-full sm:space-x-6 space-y-4 sm:space-y-0">
            {!sending && (
              <button
                type="button"
                onClick={handleAddNew}
                className="text-white bg-blue-700 dark:bg-black/80 hover:bg-blue-800 dark:hover:bg-black focus:ring-4 text-center focus:outline-none focus:ring-blue-300 dark:focus:ring-sfy font-medium rounded-lg text-sm px-6 py-2.5  items-center w-[150px] "
              >
                Add Request
              </button>
            )}
            {sending && loadingSvg}
          </div>
        </div>
        {requests.length > 0 && (
          <div className="mx-auto my-8 w-[250px] sm:w-full md:px-6">
            <div className="pb-4">
              <h1 className="text-lg">Saved Requests</h1>
            </div>
            <div className="w-full overflow-auto no-scrollbar border border-gray-200 dark:border-black/70 duration-500 rounded-md">
              <table className="min-w-full">
                <thead className="bg-gray-500 dark:bg-black duration-500 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Document Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Employee
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Note
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-sfy divide-y divide-gray-200 dark:divide-black duration-500">
                  {requests.map((item, index) => (
                    <tr
                      key={index}
                      className="w-full hover:bg-gray-100 dark:hover:bg-black/50 text-gray-900 dark:text-white duration-500"
                      onClick={() => {
                        setSelectedRow(item);
                        setIsModalOpen(true);
                        setindex(index);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap w-1/4 ">
                        <p className="text-sm truncate overflow-hidden overflow-ellipsis max-w-[150px]">
                          {item.documentName}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  w-1/4">
                        <p className="text-sm truncate overflow-hidden overflow-ellipsis max-w-[150px]">
                          {item.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  lg:w-1/4 ">
                        <p className="text-sm truncate overflow-hidden overflow-ellipsis max-w-[150px]">
                          {item.note}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  w-1/4">
                        <p className="text-sm truncate overflow-hidden overflow-ellipsis max-w-[150px]">
                          {item.dueDate}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <RequestModel
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        selectedRow={selectedRow}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default RequestDoc;
