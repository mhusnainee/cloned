import React from "react";

const BottomModal = React.memo(function BottomModal({ open, children }) {
  return (
    <div
      className={`fixed w-screen h-screen top-full left-0 right-0 duration-700 bg-black/90 z-[60] no-scrollbar overflow-y-scroll ${
        open ? "-translate-y-full" : "pointer-events-none"
      }  h-screen`}
    >
      {children}
    </div>
  );
});

export default BottomModal;
