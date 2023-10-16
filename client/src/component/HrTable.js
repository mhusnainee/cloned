import React, { useState, Fragment } from "react";
import { Dropdown } from "flowbite-react";
import { dots } from "../assets/icons";
import { archive_user } from "../auth/authService";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const HrTable = ({ data, setselectedPerson, departmentData, setReload }) => {
  const [selectedOption, setSelectedOption] = useState("byId");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
  const [departments] = useState(departmentData);
  const [open, setOpen] = useState(false);
  const [selectedDep, setSelectedDep] = useState(departmentData[0]);

  const [selected_person_to_delete, setSelected_person_to_delete] = useState(
    {}
  );
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    let filteredResults = [];
    if (selectedOption === "byId") {
      filteredResults = data.filter((item) =>
        item.email?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    } else {
      filteredResults = data.filter((item) =>
        item.firstName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }
    setSearchResults(filteredResults);
  };

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const delete_user = async () => {
    await archive_user(selected_person_to_delete.email)
      .then((res) => {
        notify("User Archived successfully!", "success");
        setOpen(false);
        setReload(Math.random());
      })
      .catch((err) => {
        setOpen(false);
        notify("Something went wrong!", "error");
      });
    setSelected_person_to_delete({});
  };
  return (
    <div className="relative flex flex-col max-w-[750px] overflow-hidden">
      <div className="w-full mt-2 mb-1 text-black dark:text-sfy duration-500 py-2 grid grid-cols-1 sm:grid-cols-2">
        <div className="w-full sm:pr-2">
          <div className="w-full p-0.5">
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              <h1>Filter User</h1>
            </label>
            <input
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              type="text"
              className="bg-gray-50 border outline-none focus:ring-none border-gray-300 dark:bg-sfy/10 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 dark:border-sfy dark:focus:border-black block w-full dark:focus:ring-black duration-500"
            />
          </div>

          <div className="mt-1">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="radio"
                    className="form-radio dark:focus:ring-sfy dark:border-sfy dark:text-sfy duration-500"
                    checked={selectedOption === "byId"}
                    onChange={() => setSelectedOption("byId")}
                  />
                  <span className="ml-2">By ID</span>
                </label>
                <label className="inline-flex items-center ml-4 text-sm">
                  <input
                    type="radio"
                    className="form-radio dark:focus:ring-sfy dark:border-sfy dark:text-sfy duration-500"
                    checked={selectedOption === "byName"}
                    onChange={() => setSelectedOption("byName")}
                  />
                  <span className="ml-2">By Name</span>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className={`border dark:border-sfy font-medium text-sm text-gray-500 dark:text-sfy px-2 py-1 duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy/30 flex items-center space-x-1`}
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults(data);
                  }}
                >
                  <div>Clear </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:pl-2">
          <div className="w-full p-0.5">
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              <h1>Department</h1>
            </label>

            <select
              id="departments"
              onChange={(e) => setSelectedDep(e.target.value)}
              className="bg-gray-50 border border-gray-300 outline-none focus:ring-none dark:bg-sfy/10 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 dark:border-sfy dark:focus:border-black block w-full dark:focus:ring-black duration-500"
            >
              {departments.map((dep, index) => (
                <option
                  key={index}
                  value={dep}
                  className="dark:bg-black dark:text-white"
                >
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full border rounded-lg overflow-auto no-scrollbar duration-500 dark:bg-sfy">
        <table className="w-full divide-y divide-gray-200 dark:divide-black duration-500">
          <thead className="bg-gray-50 dark:bg-black text-gray-500 dark:text-white duration-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left uppercase "
              >
                User
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left uppercase "
              >
                Designation
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right uppercase "
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-y dark:divide-black duration-500">
            {searchResults.map((person, index) => (
              <Fragment key={index}>
                {selectedDep === person.department && (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 dark:hover:bg-black/50 duration-500 cursor-pointer"
                  >
                    <td
                      onClick={() => {
                        setselectedPerson(person);
                      }}
                      className="px-6 py-4 text-sm min-w-[300px]"
                    >
                      <div className="flex">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={person.profilePicture}
                          alt=""
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white duration-500">
                            {person.firstName + " " + person.lastName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-white/70 duration-500">
                            {person.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td
                      onClick={() => {
                        setselectedPerson(person);
                      }}
                      className="px-6 py-4 text-sm min-w-[200px] text-gray-900 dark:text-white duration-500"
                    >
                      {person.designation}
                    </td>

                    <td className="pl-8 sm:pl-10 md:pl-12 py-4 text-sm  w-[100px]">
                      <Dropdown
                        label={
                          <div className="w-6 h-8 flex justify-center items-center mt-1">
                            {dots}
                          </div>
                        }
                        arrowIcon={false}
                        inline={true}
                        className="dark:!bg-black shadow-lg"
                        placement="left-start"
                      >
                        <Dropdown.Item
                          as="div"
                          className="dark:hover:!bg-sfy"
                          onClick={() => {
                            setSelected_person_to_delete(person);
                            setOpen(true);
                          }}
                        >
                          Delete employee
                        </Dropdown.Item>
                      </Dropdown>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={open}
        message="Are you sure you want to Archive the user?"
        yes={delete_user}
        no={setOpen}
      />
    </div>
  );
};

export default HrTable;
