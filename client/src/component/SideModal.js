import React from "react";

const SideModal = React.memo(function SideModal({ open, children }) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-screen z-20 bg-black/50 duration-700 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed top-0 -right-[1000px] duration-700 bg-white z-[70] no-scrollbar overflow-y-scroll ${
          open ? "-translate-x-[1000px]" : "pointer-events-none"
        }  w-full md:w-[600px] h-screen p-2 grid place-items-center`}
      >
        {children}
      </div>
    </>
  );
});

export default SideModal;
