import React from "react";
import { tickWhite } from "../../assets/icons";

const Color = React.memo(function Color({ bgColor, currentColor, setColor }) {
  return (
    <button
      type="button"
      onClick={() => setColor(bgColor)}
      className={`w-[20px] h-[20px] rounded-[50%] ${bgColor}`}
    >
      {currentColor === bgColor && tickWhite}
    </button>
  );
});

export default Color;
