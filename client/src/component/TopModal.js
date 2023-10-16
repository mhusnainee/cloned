import React from "react";

function TopModal({ open, children }) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex z-20 bg-black/50 items-center justify-center duration-500 ${
        open ? "opacity-100z" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`md:absolute opacity-0 -top-[250px] duration-500 ${
          open ? "md:translate-y-[300px] opacity-100" : "pointer-events-none"
        }  w-fit h-fit rounded-lg p-6 flex flex-col justify-around items-center`}
      >
        {children}
      </div>
    </div>
  );
}

export default TopModal;
