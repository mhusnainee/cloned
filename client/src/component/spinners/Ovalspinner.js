import React from "react";

import { Grid } from "react-loader-spinner";
const Ovalspinner = ({ display }) => {
  return (
    <div>
      {display && (
        <div className="">
          <div className="font-mono mt-4 mb-3">
            Please Wait! this may take some time.{" "}
          </div>
          <Grid
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={display}
          />
        </div>
      )}
    </div>
  );
};

export default Ovalspinner;
