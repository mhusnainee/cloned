import React from "react";
import { useState, useEffect } from "react";
import { selectedIcon, upArrow, downArrow } from "../assets/icons";

const Select = React.memo(function Select({
  options,
  selected,
  setSelected,
  selectClassName,
  disabled,
  selectId,
  dropdownId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById(dropdownId);
    const select = document.getElementById(selectId);
    if (dropdown && !select.contains(event.target)) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`w-full h-full ${
        disabled && "pointer-events-none"
      } relative flex flex-col justify-center items-center text-[14px] font-normal`}
    >
      <button
        tabIndex={disabled ? "-1" : ""}
        id={selectId}
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
        className={selectClassName}
      >
        {selected ? selected : "Select"}
        <span>{isOpen ? upArrow : downArrow}</span>
      </button>

      <div
        id={dropdownId}
        className={`w-full absolute top-11 right-0 h-fit z-[1000] py-1 border dark:border-black flex-col items-start rounded-md mt-1 bg-white dark:bg-black dark:text-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options?.map((option, index) => (
          <button
            type="button"
            key={index}
            value={option}
            className={`w-full flex flex-row justify-start items-center px-2 gap-x-2 py-0.5 hover:bg-blue-600 dark:hover:bg-sfy hover:text-white `}
            onClick={setSelected}
          >
            <div className="w-[20px] h-full flex justify-center items-center">
              {selected === option ? selectedIcon : ""}
            </div>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
});

export default Select;
