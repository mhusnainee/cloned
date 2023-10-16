import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";

function Leave({ title, data, setSelectedLeave }) {
  return (
    <div
      onClick={() => {
        setSelectedLeave(data);
      }}
      className="w-[90%] dark:bg-sfy dark:text-white duration-500  sm:w-[80%] min-h-[40px] md:min-h-[50px] rounded-[5px] bg-slate-100 hover:bg-slate-300 cursor-pointer shadow-md shadow-black/20 flex flex-col justify-around items-center my-[10px] py-[5px]"
    >
      <div className="w-full h-full text-[10px] sm:text-[12px] md:text-[16px] flex flex-row justify-around items-center px-[5px]">
        <div className="w-[33%] h-full  flex flex-row justify-start items-center">
          <h1 className=" font-bold ml-[10px] ">{title}</h1>
        </div>
        <div className="w-[33%] h-full  flex flex-row justify-center items-center">
          <h1 className=" font-bold">{data.numberOfDays}</h1>
        </div>
        <div className="w-[33%] h-full  flex flex-row justify-end items-center">
          <h1 className="mr-[10px] md:mr-[15px] font-[500]">
            {data?.status === "Approved"
              ? `${data.status}`
              : data?.status === "Pending"
              ? "Pending"
              : "Rejected"}
          </h1>
          <img
            className="w-[15px] mr-[10px]"
            src={data?.status === "Approved" ? tick : cross}
            alt="status"
          />
        </div>
      </div>
    </div>
  );
}

export default Leave;
