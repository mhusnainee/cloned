import React from "react";

const Tab = React.memo(function Tab({ data, tab, setTab }) {
  return (
    <div
      onClick={() => setTab(data.name)}
      className={`group border text-[10px] sm:text-[16px]  border-gray-100 mr-[5px] sm:mr-[10px] dark:border-sfy rounded-[5px] duration-500 w-fit h-[35px] sm:h-full px-2 sm:px-3 flex items-center cursor-pointer ${
        tab === data.name
          ? "bg-gray-100 dark:bg-sfy dark:text-white"
          : "text-black dark:text-sfy"
      } hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white`}
    >
      {data?.icon}
      <span className={`${data.name !== tab && "hidden md:block"} ml-[10px]`}>
        {data.name}
      </span>
    </div>
  );
});

export default Tab;
