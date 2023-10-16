/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  settingsIcon,
  folderIcon,
  goBackIcon,
  PersonalInfoIcon,
} from "../assets/icons";
import ProfileInfo from "./Profile/ProfileInfo";
import SharedDocs from "../pages/SharedDocs";
import RequestDoc from "./RequestDoc";
import Permissions from "./Permissions";

const Roster = ({ selectedPerson, setselectedPerson, setReload }) => {
  const [selected, setSelected] = useState(1);
  return (
    <div className="w-full md:w-[750px] px-4">
      <div className=" w-full h-[40px] flex items-center justify-between space-x-2 mb-4">
        <div className="flex flex-wrap items-start space-x-1 sm:space-x-2">
          <button
            type="button"
            className={` border dark:border-sfy font-medium text-gray-500 dark:hover:text-white text-xs sm:text-sm px-1 md:px-2 py-1 rounded-md duration-500 flex items-center space-x-1 ${
              selected === 1
                ? "bg-slate-100 dark:bg-sfy dark:text-white"
                : "hover:bg-slate-100 dark:text-sfy dark:hover:bg-sfy"
            } `}
            onClick={() => setSelected(1)}
          >
            <div>{PersonalInfoIcon}</div>
            <div className={selected !== 1 ? "hidden md:block" : ""}>
              Personal Info
            </div>
          </button>
          <button
            type="button"
            className={` border dark:border-sfy font-medium text-gray-500 dark:hover:text-white text-xs sm:text-sm px-1 md:px-2 py-1 rounded-md duration-500 flex items-center space-x-1 ${
              selected === 2
                ? "bg-slate-100 dark:bg-sfy dark:text-white"
                : "hover:bg-slate-100 dark:text-sfy dark:hover:bg-sfy"
            } `}
            onClick={() => setSelected(2)}
          >
            <div>{folderIcon}</div>
            <div className={selected !== 2 ? "hidden md:block" : ""}>
              Request Doc
            </div>
          </button>
          <button
            type="button"
            className={` border dark:border-sfy font-medium text-gray-500 dark:hover:text-white text-xs sm:text-sm px-1 md:px-2 py-1 rounded-md duration-500 flex items-center space-x-1 ${
              selected === 3
                ? "bg-slate-100 dark:bg-sfy dark:text-white"
                : "hover:bg-slate-100 dark:text-sfy dark:hover:bg-sfy"
            } `}
            onClick={() => setSelected(3)}
          >
            <div>{folderIcon}</div>
            <div className={selected !== 3 ? "hidden md:block" : ""}>
              Shared Doc
            </div>
          </button>
          <button
            type="button"
            className={` border dark:border-sfy font-medium text-gray-500 dark:hover:text-white text-xs sm:text-sm px-1 md:px-2 py-1 rounded-md duration-500 flex items-center space-x-1 ${
              selected === 4
                ? "bg-slate-100 dark:bg-sfy dark:text-white"
                : "hover:bg-slate-100 dark:text-sfy dark:hover:bg-sfy"
            } `}
            onClick={() => setSelected(4)}
          >
            <div>{settingsIcon}</div>
            <div className={selected !== 4 ? "hidden md:block" : ""}>
              Settings
            </div>
          </button>
        </div>
        <div
          className={`border dark:border-sfy font-medium cursor-pointer text-sm text-gray-500 dark:text-sfy px-2 py-1 duration-500 rounded-md hover:bg-slate-100 dark:hover:bg-sfy/30 flex items-center space-x-1`}
          onClick={() => setselectedPerson(null)}
        >
          <div>{goBackIcon}</div>
          <h1 className="text-sm">Back</h1>
        </div>
      </div>

      {selected === 1 && <ProfileInfo selectedPerson={selectedPerson} />}
      {selected === 2 && <RequestDoc selectedPerson={selectedPerson} />}
      {selected === 3 && <SharedDocs selectedPerson={selectedPerson} />}
      {selected === 4 && (
        <Permissions selectedPerson={selectedPerson} setReload={setReload} />
      )}
    </div>
  );
};

export default Roster;
