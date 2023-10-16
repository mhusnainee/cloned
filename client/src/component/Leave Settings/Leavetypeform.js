import { useState, useEffect, Fragment } from "react";
import {
  storage,
  goBackIcon,
  deleteIcon,
  loadingSvg,
} from "../../assets/icons";
import { toast } from "react-toastify";
import Color from "./Color";
import { colorData } from "../../utils/static";
import ConfirmModal from "../ConfirmModal";
import FloatingMessage from "./FloatingMessage";
import {
  update_leave_attributes,
  add_new_leaveType,
  delete_leaveType,
  add_sharedPool_Leave,
} from "../../API/leaveCalls";
import Select from "../Select";

function Leavetypeform({
  mode,
  details,
  leaves,
  setShowAddType,
  setReload,
  setSelected,
}) {
  const [leaveData, setLeaveData] = useState({
    leaveName: "",
    offDays: 0,
    permissionRequired: false,
    leaveDescription: "",
    color: "",
    countHalfDayFullDay: false,
    disable: false,
    maxDays: 0,
    halfDayRequest: false,
    inclusiveOffDays: false,
    sharedPool: false,
    sharedPoolWith: "",
    carryForward: 0,
    noticePeriod: 0,
    proRata: false,
    sendDocs: false,
    accureLeave: false,
    applicabilityType: "Months",
    appliabilityValue: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update") {
      getDetail();
    }
  }, [mode]);

  const getDetail = () => {
    setLeaveData({
      _id: details._id,
      leaveName: details.leaveName,
      offDays: details.offDays ?? 0,
      permissionRequired: details.permissionRequired ?? false,
      leaveDescription: details.leaveDescription ?? "",
      color: details.color ?? "",
      leavesTaken: details.leavesTaken,
      countHalfDayFullDay: details.countHalfDayAsFullDay ?? false,
      disable: details.disable ?? false,
      maxDays: details.maxDays ?? 0,
      halfDayRequest: details?.halfDayRequest ?? false,
      inclusiveOffDays: details?.inclusiveOffDays ?? false,
      sharedPool: details?.sharedPool ?? false,
      sharedPoolWith: details?.sharedPoolWith ?? "",
      carryForward: details?.carryForward ?? "",
      noticePeriod: details?.noticePeriod ?? "",
      proRata: details?.proRata ?? false,
      sendDocs: details?.sendDocs ?? false,
      accureLeave: details?.accureLeave ?? false,
      applicabilityType: details?.appliabilityType ?? "Months",
      appliabilityValue: details?.appliabilityValue ?? "",
    });
  };

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "update") {
      await update_leave_attributes(leaveData, details.leaveName)
        .then((res) => {
          notify(res.data.message, "success");
          setReload(Math.random());
          setSelected(null);
        })
        .catch((err) => {
          notify(err.response.data.message, "error");
        });
      setLoading(false);
    } else {
      if (leaveData.sharedPool) {
        handle_sharedPool();
      } else {
        leaveData.leavesTaken = [];
        leaveData.remaingDays = 0;
        await add_new_leaveType(leaveData)
          .then((res) => {
            setReload(Math.random());
            notify(res.data.message, "success");
            setShowAddType(false);
            clear_data();
          })
          .catch((err) => {
            notify(err.response.data.message, "error");
          });
        setLoading(false);
      }
    }
  };

  const handle_sharedPool = async () => {
    let shared_with = leaves.find(
      (obj) => obj.leaveName === leaveData.sharedPoolWith
    );
    console.log(shared_with);
    leaveData.maxDays = shared_with.maxDays;
    leaveData.offDays = shared_with.offDays;
    leaveData.leavesTaken = [];
    await add_sharedPool_Leave(leaveData)
      .then((res) => {
        setReload(Math.random());
        notify(res.data.message, "success");
        setShowAddType(false);
        clear_data();
      })
      .catch((err) => {
        notify(err.response.data.message, "error");
      });
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    await delete_leaveType(details.leaveName)
      .then((res) => {
        console.log(res);
        notify("Leave type deleted successfully!", "success");
        setReload(Math.random());
        setSelected(null);
      })
      .catch((err) => {
        console.log(err);
        notify("Something went wrong try again", "error");
      });
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "text") {
      setLeaveData({ ...leaveData, [name]: value });
    } else if (type === "number") {
      const parsedValue = parseFloat(value);
      const updatedValue = isNaN(parsedValue) ? "" : parsedValue;
      setLeaveData({
        ...leaveData,
        [name]: updatedValue,
      });
    } else if (type === "checkbox") {
      setLeaveData({ ...leaveData, [name]: checked });
    } else {
      setLeaveData({ ...leaveData, [name]: value });
    }
  };

  const handle_radioInput_changes = (e) => {
    const { checked, name } = e.target;

    if (name === "halfDayRequest" && leaveData.halfDayRequest === true) {
      setLeaveData({
        ...leaveData,
        halfDayRequest: checked,
      });
    } else if (
      name === "halfDayRequest" &&
      leaveData.halfDayRequest === false
    ) {
      setLeaveData({
        ...leaveData,
        halfDayRequest: checked,
        countHalfDayFullDay: false,
      });
    }

    if (
      name === "countHalfDayFullDay" &&
      leaveData.countHalfDayFullDay === true
    ) {
      setLeaveData({
        ...leaveData,
        countHalfDayFullDay: checked,
      });
    } else if (
      name === "countHalfDayFullDay" &&
      leaveData.countHalfDayFullDay === false
    ) {
      setLeaveData({
        ...leaveData,
        countHalfDayFullDay: checked,
        halfDayRequest: false,
      });
    }
  };

  const clear_data = () => {
    setLeaveData({
      leaveName: "",
      offDays: 0,
      permissionRequired: false,
      leaveDescription: "",
      color: "",
      countHalfDayFullDay: false,
      disable: false,
      maxDays: 0,
      halfDayRequest: false,
      inclusiveOffDays: false,
      sharedPool: false,
      sharedPoolWith: "",
      carryForward: 0,
      noticePeriod: 0,
      proRata: false,
    });
  };

  return (
    <>
      <div
        className={`${
          mode === "update" ? "w-full md:w-[750px]" : "w-full md:w-[500px]"
        } h-fit flex flex-col text-[12px] sm:text-[16px]`}
      >
        {mode !== "update" && (
          <div className="w-full h-[65px] border-b border-b-gray-100 dark:border-b-black duration-500 dark:text-sfy mb-[10px] flex flex-row items-center justify-between">
            <h3 className="text-[20px] mb-[3px]">Add leave type</h3>
            <button
              onClick={() => {
                setShowAddType(false);
                clear_data();
              }}
              className="flex items-center border border-gray-200 dark:border-sfy px-2 py-1 hover:bg-gray-100 dark:hover:bg-sfy/20 rounded-md duration-500"
            >
              {goBackIcon} Back
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full h-fit bg-gray-100 duration-500 dark:bg-sfy rounded-[5px] flex flex-col justify-start items-center p-[15px] sm:p-[30px]"
        >
          <label className="w-full dark:text-white duration-500">
            Leave Name
            <input
              type="text"
              name="leaveName"
              autoComplete="off"
              required
              className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white mt-[5px] duration-500 outline-none focus:outline-none"
              placeholder="Enter leave name"
              value={leaveData.leaveName}
              onChange={(e) => handleChange(e)}
            />
          </label>

          <FloatingMessage
            label="Shared Pool"
            name="sharedPool"
            message="If enabled, this leave will be shared with the selected leave."
            checked={leaveData.sharedPool}
            handleChange={handleChange}
          />

          <div
            className={`w-full overflow-hidden duration-500 ${
              leaveData.sharedPool ? "h-[40px] mt-[10px] p-[1px]" : "h-[0px]"
            }`}
          >
            <select
              disabled={!leaveData.sharedPool}
              className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white duration-500 outline-none focus:outline-none"
              onChange={(e) => handleChange(e)}
              name="sharedPoolWith"
            >
              <option>Select Leave Type:</option>
              {leaves?.map((leave) => (
                <option key={leave?.leaveName} value={leave?.leaveName}>
                  {leave.leaveName}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`w-full flex flex-col ${
              leaveData.sharedPool
                ? "h-[0px]"
                : "h-[290px] sm:h-[310px] mt-[5px] p-[1px]"
            } duration-500 overflow-hidden`}
          >
            <label className="w-full dark:text-white duration-500">
              Allowance
              <input
                disabled={leaveData.sharedPool}
                type="number"
                name="offDays"
                autoComplete="off"
                required
                className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white mt-[5px] duration-500 outline-none focus:outline-none"
                placeholder="Allowance days per year e.g 14, 10.5 "
                value={leaveData.offDays}
                onChange={(e) => handleChange(e)}
              />
            </label>

            <label className="w-full mt-[10px] dark:text-white duration-500">
              Maximum days off
              <input
                disabled={leaveData.sharedPool}
                type="number"
                name="maxDays"
                autoComplete="off"
                required
                className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white mt-[5px] duration-500 outline-none focus:outline-none"
                placeholder="Maximum consecutive days off"
                value={leaveData.maxDays}
                onChange={(e) => handleChange(e)}
              />
            </label>

            <label className="w-full mt-[10px] dark:text-white duration-500">
              Carry forward leaves
              <input
                disabled={leaveData.sharedPool}
                type="number"
                name="carryForward"
                autoComplete="off"
                className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white mt-[5px] duration-500 outline-none focus:outline-none"
                placeholder="Carry forward unavailed leaves in the next year"
                value={leaveData.carryForward}
                onChange={(e) => handleChange(e)}
              />
            </label>

            <label className="w-full mt-[10px] dark:text-white duration-500">
              Prior notice period{" "}
              <span className="text-sm text-red-600 dark:text-white">
                {" "}
                (in days)
              </span>
              <input
                disabled={leaveData.sharedPool}
                type="number"
                name="noticePeriod"
                autoComplete="off"
                className="text-black w-full h-[40px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black px-[10px] bg-white mt-[5px] duration-500 outline-none focus:outline-none"
                placeholder="Carry forward remaining leaves in the next year"
                value={leaveData.noticePeriod}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>

          <label className="w-full text-left mt-[5px] text-black dark:text-white duration-500">
            Leave applicability
          </label>
          <div className="w-full flex flex-row justify-between items-center mt-[5px]">
            <div className="w-[25%] min-w-[100px] h-full">
              <Select
                disabled={false}
                selectId="applicabilitySelect"
                dropdownId="applicabilityDrpopdown"
                options={["Months", "Days"]}
                selected={leaveData.applicabilityType}
                setSelected={(e) => {
                  setLeaveData({
                    ...leaveData,
                    applicabilityType: e.target.value,
                  });
                }}
                selectClassName="w-full p-[9.5px] bg-white rounded-l-md h-full border border-gray-300 flex flex-row justify-between items-center focus:border-blue-600 dark:focus:border-black focus:ring-1 focus:ring-blue-600 dark:focus:ring-black duration-500"
              />
            </div>

            <input
              type="number"
              placeholder="0, zero means instantly applicable."
              className="w-[75%] p-2 rounded-r-md border-l-transparent border-y-gray-300 outline-none border-r-gray-300 dark:focus:border-black dark:focus:ring-black duration-500"
            />
          </div>

          <div className="w-full mt-[10px] dark:text-white duration-500">
            Leave color
            <div className="w-full h-fit rounded-[5px] bg-white mt-[5px] flex flex-wrap gap-1 justify-around items-center p-[10px]">
              {colorData.map((data) => (
                <Color
                  key={data?.id}
                  bgColor={data?.bgColor}
                  currentColor={leaveData.color}
                  setColor={(data) => {
                    setLeaveData({ ...leaveData, color: data });
                  }}
                />
              ))}
            </div>
          </div>

          <FloatingMessage
            label="Requires Permission"
            name="permissionRequired"
            message="If enabled, employees will not be able to book more dates than their existing allowance."
            checked={leaveData.permissionRequired || false}
            handleChange={handleChange}
          />

          <FloatingMessage
            label="Disable"
            name="disable"
            message="If disabled, employees will not be able to apply for this leave type, unless eabled again."
            checked={leaveData.disable || false}
            handleChange={handleChange}
          />
          <FloatingMessage
            label="Half day request"
            name="halfDayRequest"
            message="If enabled, employees can book half day for this type of leave."
            checked={leaveData.halfDayRequest || false}
            handleChange={handle_radioInput_changes}
          />

          <FloatingMessage
            label="Count half day as full day"
            name="countHalfDayFullDay"
            message="If enabled, the half day leaves will be counted as full day leaves."
            checked={leaveData.countHalfDayFullDay || false}
            handleChange={handle_radioInput_changes}
          />

          <FloatingMessage
            label="Inclusive off days"
            name="inclusiveOffDays"
            message="If enabled, the rest days will be counted as leaves, like Sundays."
            checked={leaveData.inclusiveOffDays || false}
            handleChange={handleChange}
          />

          <FloatingMessage
            label="Pro Rata"
            name="proRata"
            message="If enabled, the leaves will be available according to pro rata basis."
            checked={leaveData.proRata || false}
            handleChange={handleChange}
          />

          <FloatingMessage
            label="Require documents while applying"
            name="sendDocs"
            message="If enabled, documents will be required to submit along with application."
            checked={leaveData.sendDocs || false}
            handleChange={handleChange}
          />

          <FloatingMessage
            label="Accure leaves"
            name="accureLeave"
            message="If enabled, leaves wil be accured according to leave policy."
            checked={leaveData.accureLeave || false}
            handleChange={handleChange}
          />

          <label className="w-full mt-[10px] dark:text-white duration-500">
            Description
            <textarea
              type="text"
              name="leaveDescription"
              style={{ resize: "none" }}
              className="text-black w-[100%] h-[100px] border border-gray-300 rounded-[5px] dark:focus:border-black dark:focus:ring-black mt-[5px] duration-500 outline-none focus:outline-none"
              placeholder="Description"
              value={leaveData.leaveDescription}
              onChange={(e) => {
                setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
              }}
            ></textarea>
          </label>

          <button
            disabled={loading}
            type="submit"
            className={`w-full h-[35px] duration-500 rounded-[5px] bg-blue-700 hover:bg-blue-800 dark:bg-black/60 dark:hover:bg-black text-white mt-[20px] flex flex-row justify-center items-center`}
          >
            {loading && (
              <h1 className="flex items-center justify-center">
                {loadingSvg}
                {" please wait "}
              </h1>
            )}
            {!loading && (
              <Fragment>
                {storage}
                {mode === "update" ? "Update leave type" : "Add leave type"}
              </Fragment>
            )}
          </button>

          {mode === "update" && !loading && (
            <button
              disabled={loading}
              type="button"
              onClick={() => {
                setOpen(true);
              }}
              className={`w-full h-[35px] duration-500 rounded-[5px] bg-red-700 hover:bg-red-800 dark:text-red-600 dark:bg-black/60 dark:hover:bg-black text-white mt-[20px] flex flex-row justify-center items-center`}
            >
              {deleteIcon}
              <span className="ml-[5px]">Delete</span>
            </button>
          )}
        </form>
      </div>

      {mode === "update" && (
        <ConfirmModal
          open={open}
          message="This action is irreversible. Are you sure you want to delete?"
          yes={handleDelete}
          no={setOpen}
        />
      )}
    </>
  );
}

export default Leavetypeform;
