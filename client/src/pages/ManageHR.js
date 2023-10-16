import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Panel from "./Panel";
import Register from "../component/Register";
import { manageHR_Tabs } from "../utils/static";
import ArchivedHrTable from "../component/ArchivedHrTable";

function ManageHR() {
  return (
    <>
      <Tab.Group>
        <Tab.List className="w-full flex justify-start items-center border-b-2 dark:border-b-black duration-500 mb-[20px] pb-[20px]">
          {manageHR_Tabs.map((category) => (
            <Tab
              as={Fragment}
              key={category._id}
              className={({ selected }) =>
                `group border text-[10px] outline-none focus:outline-none sm:text-[16px] border-gray-100 mr-[5px] sm:mr-[10px] dark:border-sfy rounded-[5px] duration-500 w-fit h-[35px] sm:h-[40px] px-2 sm:px-3 flex items-center cursor-pointer ${
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
            <Panel />
          </Tab.Panel>

          <Tab.Panel>
            <Register />
          </Tab.Panel>

          <Tab.Panel>
            <ArchivedHrTable />
          </Tab.Panel>

          <Tab.Panel>
            <div>Offboard employee</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default ManageHR;
