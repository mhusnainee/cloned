import { Fragment, useState } from "react";
import { goBackIcon } from "../../assets/icons.js";
import Leave from "./Leave.js";
import LeavePopup from "./LeavePopup.js";

function LeavesContainer({ setShowLeaves, data }) {
  const [selectedLeave, setSelectedLeave] = useState(null);

  const checkIsEmpty = () => {
    let result = true;
    if (data?.title === "Total Leaves") {
      for (let i = 0; i < data?.leaves?.length; i++) {
        if (data?.leaves[i]?.leave_object?.leavesTaken?.length > 0) {
          result = false;
        }
      }
    } else {
      if (data?.leaves?.length > 0) {
        result = false;
      }
    }
    return result;
  };

  return (
    <div className={`w-full md:w-[750px] rounded-[10px]`}>
      <div className="w-full rounded-t-[10px] flex flex-row justify-between items-center p-2 ">
        <h1 className="text-[12px] sm:text-[15px] md:text-[20px]  text-black dark:text-[#aa002d] duration-500">
          {data?.title}
        </h1>
        <div
          onClick={() => setShowLeaves(null)}
          className="w-[80px] h-[30px] flex flex-row justify-center items-center cursor-pointer"
        >
          {goBackIcon}
          <button>Back</button>
        </div>
      </div>
      <hr className="w-full md:w-[750px] dark:border-black duration-500 mb-4  "></hr>
      {checkIsEmpty() && (
        <h1 className="w-full text-center mt-20">
          Oops! There are no availed leaves.
        </h1>
      )}
      {!checkIsEmpty() && (
        <div className="w-full border dark:border-black duration-500 rounded-md  flex flex-col justify-start items-center overflow-auto ">
          {data && data.title !== "Total Leaves" ? (
            <Fragment>
              {data.leaves.map((leave, index) => (
                <Leave
                  key={index}
                  title={data?.title}
                  data={leave}
                  selectedLeave={selectedLeave}
                  setSelectedLeave={setSelectedLeave}
                />
              ))}
            </Fragment>
          ) : (
            <>
              {data.leaves.map((leave, index) => (
                <Fragment key={index}>
                  {leave.get_total_leave_data.map((item, index) => (
                    <Leave
                      key={index}
                      title={item.leaveName}
                      data={item}
                      selectedLeave={selectedLeave}
                      setSelectedLeave={setSelectedLeave}
                    />
                  ))}
                </Fragment>
              ))}
            </>
          )}
        </div>
      )}
      <LeavePopup
        title={
          data.title !== "Total Leaves" ? data?.title : selectedLeave?.leaveName
        }
        selectedLeave={selectedLeave}
        setSelectedLeave={setSelectedLeave}
      />
    </div>
  );
}

export default LeavesContainer;
