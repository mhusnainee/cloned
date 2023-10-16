import React from "react";

const Day = React.memo(function Day({
  edit,
  number,
  name,
  status,
  schedule,
  setSelectedDay,
}) {
  return (
    <>
      <button
        disabled={!edit}
        onClick={() => {
          setSelectedDay({
            name: name,
            number: number,
            status: status,
            schedule: schedule,
          });
        }}
        className={`w-full h-[60px] border ${
          status
            ? "border-gray-400 dark:border-white"
            : "border-gray-300 dark:border-white/50"
        } flex flex-col justify-around items-center rounded-[5px] py-[5px]`}
      >
        <h1>{name}</h1>
        <p className={`${status ? "flex" : "hidden"}`}>
          Schedule : {schedule === "fullday" ? "Full day" : "Half day"}
        </p>
      </button>
    </>
  );
});

export default Day;
