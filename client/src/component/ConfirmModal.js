import React from "react";

const ConfirmModal = React.memo(function ConfirmModal({
  open,
  message,
  yes,
  no,
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex z-20 bg-black/50 items-center justify-center duration-500 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`md:absolute opacity-0 -top-[250px] duration-500 ${
          open ? "md:translate-y-[300px] opacity-100" : "pointer-events-none"
        }  w-fit h-fit rounded-lg p-6 flex flex-col justify-around items-center`}
      >
        <div className="w-[320px] sm:w-[400px] md:w-[500px] h-[200px] rounded-[5px] flex flex-col p-[20px] bg-gray-200 dark:bg-[#aa002d] duration-500 dark:text-white">
          <div className="w-full h-[50%] flex flex-row justify-around items-center text-[20px]">
            {message}
          </div>
          <div className="w-full h-[50%] flex flex-row justify-around items-center">
            <button
              className="w-[35%] h-[50%] bg-blue-700 hover:bg-blue-800 text-white duration-500 dark:bg-black/60 dark:hover:bg-black rounded-[5px]"
              onClick={yes}
            >
              Yes
            </button>
            <button
              className="w-[35%] h-[50%] bg-blue-700 hover:bg-blue-800 text-white duration-500 dark:bg-black/60 dark:hover:bg-black rounded-[5px]"
              onClick={() => no(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ConfirmModal;
