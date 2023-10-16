import { useState, useEffect, Fragment } from "react";
import { goBackIcon } from "../../assets/icons";
import LeaveRequest from "./LeaveRequest";
function Requests({ setShowRequests, leaveData, setCounter }) {
  const [requests, setRequests] = useState(leaveData);

  // useEffect(() => {
  //   setRequests(leaveData?.leaves);
  // }, [leaveData.leaves]);

  return (
    <div className="w-[300px] sm:w-[400px] md:w-[700px] h-[600px] m-auto lg:m-0">
      <div className="w-full h-[fit] text-black dark:text-[#aa002d] duration-500 flex flex-row justify-between items-center">
        <h1 className="text-[20px] mb-[10px]">Leave Requests</h1>
        <div
          onClick={() => setShowRequests(false)}
          className="w-[80px] h-[30px] flex flex-row justify-center items-center cursor-pointer"
        >
          {goBackIcon}
          <button>Back</button>
        </div>
      </div>
      <hr className="w-full dark:border-black duration-500"></hr>
      <div className="md:w-full h-fit mt-[20px] py-[20px] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-3 overflow-y-auto">
        {requests.map((request) => (
          <Fragment key={request._id}>
            <LeaveRequest
              key={request?._id}
              data={request}
              setCounter={setCounter}
              setShowRequests={setShowRequests}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Requests;
