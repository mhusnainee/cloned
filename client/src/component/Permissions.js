/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, memo } from "react";
import EditField from "../component/Editable/EditField";
import SortableField from "./Editable/SortableField";
import { get_users } from "../auth/authService";

const Permissions = memo(function Permissions({ selectedPerson, setReload }) {
  const [selected, setSelected] = useState(1);
  const [optionss, setOptions] = useState([]);
  const [reportingManager, setReportingManager] = useState(
    selectedPerson.reportingManager
  );
  const [srreportingManager, setSrreportingManager] = useState(
    selectedPerson.seniorReportingManager
  );

  useEffect(() => {
    getData();
  }, []);

  const recallData = () => {
    setReload(Math.random());
  };

  const getData = async () => {
    await get_users().then((res) => {
      let dropdownData = res.data.map((item) => {
        return { label: item.email, value: item.email };
      });
      setOptions(dropdownData);
    });
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full  border-b-2 dark:border-b-black duration-500 pb-1 flex justify-between items-center">
          <h1 className="text-black text-xl dark:text-sfy duration-500">
            Settings
          </h1>
        </div>
        <div>
          <div className="flex flex-wrap items-start space-x-2 mt-4 mb-4">
            <button
              type="button"
              className={` border dark:border-sfy font-medium text-sm px-2 py-1 text-gray-500 dark:text-sfy duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy dark:hover:text-white flex items-center space-x-1 ${
                selected === 1 && "bg-slate-100 dark:bg-sfy dark:text-white"
              } `}
              onClick={() => setSelected(1)}
            >
              <div> Designation </div>
            </button>
            <button
              type="button"
              className={` border dark:border-sfy font-medium text-sm px-2 py-1 text-gray-500 dark:text-sfy duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy dark:hover:text-white flex items-center space-x-1 ${
                selected === 2 && "bg-slate-100 dark:bg-sfy dark:text-white"
              } `}
              onClick={() => setSelected(2)}
            >
              <div>Employment Type</div>
            </button>
            <button
              type="button"
              className={` border dark:border-sfy font-medium text-sm px-2 py-1 text-gray-500 dark:text-sfy duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy dark:hover:text-white flex items-center space-x-1 ${
                selected === 3 && "bg-slate-100 dark:bg-sfy dark:text-white"
              } `}
              onClick={() => setSelected(3)}
            >
              <div>Reporting Manager</div>
            </button>{" "}
            <button
              type="button"
              className={` border dark:border-sfy font-medium text-sm px-2 py-1 text-gray-500 dark:text-sfy duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy dark:hover:text-white flex items-center space-x-1 ${
                selected === 4 && "bg-slate-100 dark:bg-sfy dark:text-white"
              } `}
              onClick={() => setSelected(4)}
            >
              <div>Sr. Reporting Manager </div>
            </button>{" "}
          </div>
        </div>

        {selected === 1 && (
          <EditField
            fieldName={"Designation"}
            fieldValue={selectedPerson.designation}
            dbName={"designation"}
            email={selectedPerson.email}
            recallData={recallData}
          />
        )}

        {selected === 2 && (
          <EditField
            fieldName={"Employment Type"}
            fieldValue={selectedPerson.status}
            dbName={"status"}
            email={selectedPerson.email}
            recallData={recallData}
          />
        )}

        {selected === 3 && (
          <div>
            <div className="mt-4">
              <SortableField
                title={"Reporting Manager"}
                data={reportingManager}
                setData={setReportingManager}
                optionss={optionss}
                email={selectedPerson.email}
              />
            </div>
          </div>
        )}

        {selected === 4 && (
          <div>
            <div className="mt-4">
              <SortableField
                title={"Sr.Reporting Manager"}
                data={srreportingManager}
                setData={setSrreportingManager}
                optionss={optionss}
                email={selectedPerson.email}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
export default Permissions;
