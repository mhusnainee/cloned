import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import GenerateRoster from "../component/Roster/GenerateRoster";
import ViewRoster from "../component/Roster/ViewRoster";
import Preferences from "../component/Roster/Preferences";
import { roster_Tabs } from "../utils/static";

function ManageHR() {
  return (
    <>
      <Tab.Group>
        <Tab.List className="w-full flex justify-start items-center border-b-2 dark:border-b-black duration-500 mb-[20px] pb-[20px]">
          {roster_Tabs.map((category) => (
            <Tab
              as={Fragment}
              key={category._id}
              className={({ selected }) =>
                `group text-[10px] sm:text-[16px] outline-none focus:outline-none border border-gray-100 mr-[5px] sm:mr-[10px] dark:border-sfy rounded-[5px] duration-500 w-fit h-[35px] sm:h-[40px] px-2 sm:px-3 flex items-center cursor-pointer ${
                  selected
                    ? "bg-gray-100 dark:bg-sfy dark:text-white"
                    : "text-black dark:text-sfy"
                } hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white`
              }
            >
              {({ selected }) => (
                <button>
                  {category.icon}
                  <span
                    className={`${!selected && "hidden md:block"} ml-[10px]`}
                  >
                    {category.name}
                  </span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <GenerateRoster />
          </Tab.Panel>

          <Tab.Panel>
            <ViewRoster />
          </Tab.Panel>

          <Tab.Panel>
            <Preferences />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default ManageHR;
