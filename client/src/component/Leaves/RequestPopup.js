import { useState } from "react";
import { rej_approve_annual_leave } from "../../API/leaveCalls";
import Loading from "./Loading";
import { toast } from "react-toastify";

export default function RequestPopup({
  data,
  selectedRequest,
  setSelectedRequest,
  setCounter,
  setShowRequests,
}) {
  const [isloading, setIsloading] = useState(false);
  const [action, setAction] = useState();

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleForm = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const mydata = {
      data: data,
      leaveResponse: action,
    };
    await rej_approve_annual_leave(mydata)
      .then((res) => {
        setCounter(Math.random());
        setIsloading(false);
        notify(res.data.message, "success");
        setSelectedRequest(null);
        setShowRequests(false);
      })
      .catch((error) => {
        setIsloading(false);
        notify(error.message, "error");
      });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed w-screen h-screen top-0 left-0 bg-black/40 flex-col justify-center items-center cursor-auto ${
        selectedRequest === data?._id ? "flex" : "hidden"
      }`}
    >
      <div className="w-[300px] text-[11px] sm:w-[350px] sm:text-[13px] md:text-[17px] h-[300px] md:w-[500px] md:h-[400px] bg-white rounded-[10px] z-[1000] flex flex-col justify-around items-center">
        <div className="w-full h-[25%]  flex flex-row justify-around items-center py-[15px]">
          <div className="w-[50%] h-full flex flex-col justify-around items-center">
            <h1 className="font-bold">Requested By</h1>
            <h1 className="text-[9px] sm:text-[12px] md:text-[15px]">
              {data?.userID}
            </h1>
          </div>
          <div className="w-[25%] h-full  flex flex-col justify-around items-center">
            <h1 className="font-bold">Leave Type</h1>
            <h1>{data?.leaveType}</h1>
          </div>
          <div className="w-[25%] h-full  flex flex-col justify-around items-center">
            <h1 className="font-bold">Days</h1>
            <h1>{data?.days}</h1>
          </div>
        </div>
        <hr className="w-[80%]"></hr>
        <div className="w-full h-[25%]  flex flex-row justify-around items-center py-[15px]">
          <div className="w-[33%] h-full  flex flex-col justify-around items-center">
            <h1 className="font-bold">Start Date</h1>
            <h1>{data?.startDate}</h1>
          </div>
          <div className="w-[33%] h-full  flex flex-col justify-around items-center">
            <h1 className="font-bold">End Date</h1>
            <h1>{data?.endDate}</h1>
          </div>
        </div>
        <hr className="w-[80%]"></hr>
        <div className="w-full h-[60%] flex flex-col justify-around items-center pt-[10px]">
          <form
            onSubmit={handleForm}
            className="w-full h-[70%] flex flex-col justify-around items-center"
          >
            <div className="w-[80%] h-[30%] flex flex-row justify-between items-center">
              <button
                type="submit"
                className="w-[48%] h-[25px] md:h-[35px] bg-blue-300 rounded-[5px] hover:bg-blue-400"
                onClick={() => setAction("Approved")}
              >
                Accept Request
              </button>

              <button
                type="submit"
                className="w-[48%] h-[25px] md:h-[35px] bg-blue-300 rounded-[5px] hover:bg-blue-400"
                onClick={() => setAction("Rejected")}
              >
                Reject Request
              </button>
            </div>
          </form>
          <div className="w-full h-[30%] flex flex-row justify-around items-center">
            <button
              className="w-[80%] h-[25px] md:h-[35px] bg-slate-300 rounded-[5px] mb-[5px] hover:bg-slate-400"
              onClick={() => setSelectedRequest(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Loading loading={isloading} />
    </div>
  );
}
