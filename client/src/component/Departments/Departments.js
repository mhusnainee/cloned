import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import ShowDepartments from "./ShowDepartments";
import AddDepartments from "./AddDepartments";
import { storageIcon, addDepartment } from "../../assets/icons";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Departments = () => {
  const [tabs_items] = useState([
    { name: "Departments", icon: storageIcon },
    { name: "Add Departments", icon: addDepartment },
  ]);
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-[10px]">
          {tabs_items.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  `group border h-[35px] sm:h-[40px] px-2 sm:px-3 items-center text-[10px] sm:text-[16px] w-fit justify-center outline-none focus:outline-none duration-500
                    dark:border-sfy hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white ${
                      selected
                        ? "bg-gray-100 dark:bg-sfy dark:text-white"
                        : "bg-white dark:text-sfy "
                    } flex rounded-md`
                )
              }
            >
              {({ selected }) => (
                <>
                  {tab.icon}
                  <span
                    className={`${!selected && "hidden md:block"} ml-[10px]`}
                  >
                    {tab.name}
                  </span>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ShowDepartments />
          </Tab.Panel>
          <Tab.Panel>
            <AddDepartments />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Departments;
