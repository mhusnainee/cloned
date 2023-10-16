import { useState } from "react";
import RequestPopup from "./RequestPopup";
import { fetchAuthToken } from "../../auth/authToke";

export default function LeaveRequest({ data, setCounter, setShowRequests }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [user] = useState(fetchAuthToken());
  return (
    <>
      <div
        onClick={() => setSelectedRequest(data?._id)}
        className="w-[250px] h-[120px] text-[12px] sm:w-[270px] md:w-[300px] md:h-[150px] mt-[10px] rounded-[10px] bg-yellow-100/50 cursor-pointer hover:bg-slate-100 shadow-lg shadow-black/20 flex flex-col justify-around items-center sm:text-[13px] md:text-[14px]"
      >
        <div className="w-full h-[50%]  flex flex-row justify-around items-center px-2">
          <div className="w-[30%] h-full flex flex-col justify-around py-[10px] items-center">
            <h1 className="font-[500]">LeaveType</h1>
            <hr className="w-[70%]"></hr>
            <h1>{data?.leaveName}</h1>
          </div>
        </div>
        <div className="w-full h-[50%]  flex flex-row justify-around items-center">
          <div className="w-[50%] h-full flex flex-col justify-around py-[10px] items-center">
            <h1 className="font-[500]">Days</h1>
            <hr className="w-[70%]"></hr>
            <h1>{data?.numberOfDays}</h1>
          </div>
          <div className="w-[50%] h-full flex flex-col justify-around py-[10px] items-center">
            <h1 className="font-[500]">Leave Status</h1>
            <hr className="w-[70%]"></hr>
            <h1>{data?.status}</h1>
          </div>
        </div>
      </div>
      {user?.role !== "Non-Admin" && (
        <RequestPopup
          key={data?._id}
          data={data}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          setCounter={setCounter}
          setShowRequests={setShowRequests}
        />
      )}
    </>
  );
}
