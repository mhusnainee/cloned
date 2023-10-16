import React, { useState, useEffect, Fragment } from "react";
import { get_archived_users } from "../auth/authService";
import ProfileInfo from "./Profile/ProfileInfo";
import SvgLoading from "./spinners/SvgLoading";
import { goBackIcon } from "../assets/icons";

const ArchivedHrTable = () => {
  const [archived_hr_data, setArchived_hr_data] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("byId");
  const [selected_person, setSelected_person] = useState();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    get_archived_user_data();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    let filteredResults = [];
    if (selectedOption === "byId") {
      filteredResults = archived_hr_data.filter((item) =>
        item.email?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    } else {
      filteredResults = archived_hr_data.filter((item) =>
        item.firstName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }
    setSearchResults(filteredResults);
  };

  const get_archived_user_data = async () => {
    setDataLoading(true);
    await get_archived_users()
      .then((res) => {
        setArchived_hr_data(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDataLoading(false);
  };
  if (selected_person) {
    return (
      <div className="w-full md:w-[750px] px-4 mt-10">
        <div className="max-w-[750px] flex justify-end">
          <div
            className={`border dark:border-sfy font-medium cursor-pointer text-sm text-gray-500 dark:text-sfy px-2 py-1 duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy/30 flex items-center space-x-1`}
            onClick={() => setSelected_person(null)}
          >
            <div>{goBackIcon}</div>
            <h1 className="text-sm">Back</h1>
          </div>
        </div>

        <ProfileInfo selectedPerson={selected_person} />
      </div>
    );
  }
  return (
    <div>
      {dataLoading ? (
        <div className="max-w-[750px]">
          <SvgLoading />
        </div>
      ) : (
        archived_hr_data && (
          <div className="relative flex flex-col max-w-[750px] overflow-hidden">
            <div className="w-full mt-2 mb-1 text-black dark:text-sfy duration-500 py-2 grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:pr-2">
                <div className="w-full p-0.5">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium"
                  >
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
                          setSearchResults(archived_hr_data);
                        }}
                      >
                        <div>Clear </div>
                      </button>
                    </div>
                  </div>
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
                      <tr key={index} className=" duration-500 ">
                        <td className="px-6 py-4 text-sm min-w-[300px]">
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

                        <td className="px-6 py-4 text-sm min-w-[200px] text-gray-900 dark:text-white duration-500">
                          {person.designation}
                        </td>

                        <td
                          className="pl-8 sm:pl-10 md:pl-12 py-4 text-sm flex items-start w-[100px]"
                          as="div"
                          onClick={() => setSelected_person(person)}
                        >
                          <div className=" border dark:border-sfy dark:hover:bg-black/40 dark:hover:text-white font-medium text-sm dark:bg-white  text-gray-500 dark:text-sfy px-2 py-1 cursor-pointer duration-500 rounded-md hover:bg-slate-200 flex items-center space-x-1">
                            View
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ArchivedHrTable;
