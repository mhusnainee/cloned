import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import LeaveForm from "../component/Leaves/LeaveForm.js";
import LeavesContainer from "../component/Leaves/LeavesContainer.js";
import Requests from "../component/Leaves/Requests.js";
import { style, styleTwo, styleThree } from "../styles/MainPageStyles.js";
import { getUserLeavesData } from "../API/leaveCalls.js";
import { loadingSvg } from "../assets/icons.js";

const MainPage = () => {
  const [showLeaves, setShowLeaves] = useState("");
  const [showRequests, setShowRequests] = useState(false);
  const [requestLeave, setRequestLeave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [data, setdata] = useState();
  const [selectedLeave, setselectedLeave] = useState();

  useEffect(() => {
    getdata();
  }, [counter]);

  const getdata = async () => {
    setLoading(true);

    await getUserLeavesData()
      .then((res) => {
        if (res) {
          setdata(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterPending = () => {
    let pendingLeaves = [];
    if (data) {
      data?.data.map((item) => {
        item.get_total_leave_data?.map((obj) => {
          if (obj.status === "Pending") {
            pendingLeaves.push(obj);
          }
        });
      });
    }
    return pendingLeaves;
  };
  return (
    <>
      <div
        className={`w-full md:w-[750px] p-[3px] ${
          showLeaves || requestLeave || showRequests ? "hidden" : "block"
        }`}
      >
        <h1 className="text-[12px] sm:text-[15px] md:text-[20px] mb-[10px] text-black dark:text-sfy duration-500">
          Leaves
        </h1>
        <hr className="w-full md:w-[750px] dark:border-black duration-500"></hr>

        <div className="w-full border text-black dark:text-white dark:bg-sfy duration-500 rounded-[10px] h-auto sm:w-full text-[9px] sm:text-[12px] md:text-[15px] mt-[20px] sm:p-[10px] flex flex-col justify-start items-center">
          <div className="w-full h-[230px] sm:h-fit text-[12px] md:text-[15px] overflow-x-auto no-scrollbar">
            <div className="w-full min-w-[500px] h-full sm:w-full rounded-[10px] border border-gray-300 dark:border-black duration-500 flex flex-col justify-around items-center">
              <div className="w-[100%] duration-500 h-[60px] text-black dark:text-white bg-gray-200 dark:bg-black flex flex-row justify-around items-center rounded-t-[10px] ">
                <div className="w-[100px] h-[100%] "></div>
                <h1 className="font-bold">Total Leaves</h1>
                <h1 className="font-bold">Availed Leaves</h1>
                <h1 className="font-bold">Remaining Leaves</h1>
              </div>
              {loading ? (
                <div className="w-full py-8 flex justify-center items-center border-t dark:border-t-black duration-500 text-black dark:text-white">
                  {loadingSvg} Loading please wait...!
                </div>
              ) : data?.data?.length === 0 ? (
                <div className="w-full py-8 text-md flex justify-center border-t dark:border-t-black text-black dark:text-white duration-500">
                  Oops! There are no leave types.
                </div>
              ) : (
                <Fragment>
                  <div
                    className={styleTwo}
                    onClick={() => {
                      setShowLeaves("total");
                      setselectedLeave({
                        title: "Total Leaves",
                        leaves: data.data,
                      });
                    }}
                  >
                    <div className={styleThree}>All</div>
                    <div className={style}>{data?.totalOffDays}</div>
                    <div className={style}>{data?.availed_total_count}</div>
                    <div className={style}>
                      {String(data?.totalOffDays - data?.availed_total_count)}
                    </div>
                  </div>

                  {data?.data?.map((item, index) => (
                    <Fragment key={index}>
                      {item.leave_object.disable === false && (
                        <>
                          <hr className="w-[100%] border-gray-300 dark:border-black duration-500"></hr>
                          <div
                            className={styleTwo}
                            onClick={() => {
                              setShowLeaves(item.leave_object.leaveName);
                              setselectedLeave({
                                title: item.leave_object.leaveName,
                                leaves: item.get_total_leave_data,
                              });
                            }}
                          >
                            <div className={styleThree}>
                              {item.leave_object.leaveName}
                            </div>
                            <div className={style}>
                              {item.leave_object.offDays}
                            </div>
                            <div className={style}>
                              {item.particular_leave_availed_leangth}
                            </div>
                            <div className={style}>
                              {item.leave_object.offDays -
                                item.particular_leave_availed_leangth}
                            </div>
                          </div>
                        </>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </div>
          </div>

          <div className="w-full  min-h-[50px] flex sm:justify-end justify-center space-x-4 items-center mt-[30px]">
            <button
              onClick={() => setShowRequests(true)}
              className="py-2 px-4 sm:h-[75%] duration-500 rounded text-white dark:text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 dark:bg-black/60 dark:hover:bg-black"
            >
              Leaves for Approval
            </button>
            <button
              onClick={() => setRequestLeave(true)}
              className="py-2 px-4 sm:h-[75%] duration-500 rounded text-white dark:text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 dark:bg-black/60 dark:hover:bg-black"
            >
              Request Leave
            </button>
          </div>
        </div>
      </div>
      {showLeaves && (
        <LeavesContainer setShowLeaves={setShowLeaves} data={selectedLeave} />
      )}

      {requestLeave && data && (
        <LeaveForm
          setRequestLeave={setRequestLeave}
          setCounter={setCounter}
          leaveData={data.data}
        />
      )}

      {showRequests && data && (
        <Requests
          setShowRequests={setShowRequests}
          leaveData={filterPending()}
          setCounter={setCounter}
        />
      )}
    </>
  );
};

export default MainPage;
