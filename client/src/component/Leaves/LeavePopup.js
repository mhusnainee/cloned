import { useState } from "react";
import { loadingSvg, xmark } from "../../assets/icons";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";

function LeavePopup({ title, selectedLeave, setSelectedLeave }) {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setLoading(true);
    console.log("Leave canceled...!!!");
    setIsOpen(false);

    setTimeout(() => {
      setLoading(false);
      notify("Leave request canceled successfully!", "success");
      setSelectedLeave(null);
    }, 1000);
  };

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed w-screen h-screen top-0 left-0 bg-black/10 flex-col justify-center items-center cursor-auto ${
          selectedLeave ? "flex" : "hidden"
        }`}
      >
        <div className="w-[320px] md:w-[400px] p-2 md:p-6 lg:w-[500px] dark:bg-sfy dark:text-white duration-500 text-[13px] md:text-[15px] bg-white rounded-md z-[100] flex flex-col justify-around items-center">
          <div className="w-full border-b p-2 md:p-3 mt-2 flex justify-between items-center">
            <h1 className="font-bold">Leave request details</h1>
            <button onClick={() => setSelectedLeave(null)}>{xmark}</button>
          </div>
          <div className="w-full flex flex-row justify-around items-center border-b p-2 md:p-3 mt-2">
            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">Leave Type</h1>
              <h1>{title}</h1>
            </div>
            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">Days</h1>
              <h1>
                {selectedLeave?.numberOfDays === 0.5
                  ? selectedLeave?.half_info
                  : selectedLeave?.numberOfDays}
              </h1>
            </div>
            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">Leave Status</h1>
              <h1
                className={`${
                  selectedLeave?.status === "Approved" ||
                  selectedLeave?.status === "Pending"
                    ? "text-green-400"
                    : "text-red-500"
                }`}
              >
                {selectedLeave?.status === "Approved"
                  ? `${selectedLeave.status}`
                  : selectedLeave?.status === "Pending"
                  ? "Pending"
                  : "Rejected"}
              </h1>
            </div>
          </div>

          <div className="w-full h-[30%]  flex flex-row justify-around items-center border-b p-2 md:p-3 mt-2">
            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">Start Date</h1>
              <h1>{selectedLeave?.startDate}</h1>
            </div>
            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">End Date</h1>
              <h1>{selectedLeave?.endDate}</h1>
            </div>

            <div className="w-[33%] h-full  flex flex-col justify-around items-center">
              <h1 className="font-bold">
                {selectedLeave?.leaveType === "Annual" && (
                  <>
                    {selectedLeave?.status === "approved"
                      ? "Approved by"
                      : "Rejected by"}
                  </>
                )}
              </h1>
              <h1>{selectedLeave?.approver}</h1>
            </div>
          </div>

          <div className="w-full flex flex-col items-center p-2 md:p-3 mt-2">
            <div className="w-full flex flex-col border-b">
              <div className="w-full h-full flex">
                <h1 className="font-bold">Comment:</h1>
              </div>
              <div className="w-full h-full py-2">
                <p>{selectedLeave?.comments}</p>
              </div>
            </div>

            {loading && <span className="mt-6">{loadingSvg}</span>}

            {!loading && (
              <button
                className="px-5 py-2 text-white dark:bg-black/60 dark:hover:bg-black duration-500 rounded-md mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center outline-none focus:outline-none focus:ring-blue-300 dark:focus:ring-white"
                onClick={() => setIsOpen(true)}
              >
                Cancel request
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={isOpen}
        message="Do you really want to cancel this leave request?"
        yes={handleCancel}
        no={setIsOpen}
      />
    </>
  );
}

export default LeavePopup;
