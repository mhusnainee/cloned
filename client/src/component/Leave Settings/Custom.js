import { useState, useEffect, Fragment } from "react";
import Customday from "./Customday";
import CustomdayForm from "./CustomdayForm";
import SideModal from "../SideModal";
import { get_custom_days } from "../../API/leaveCalls";
// import { loadingSvg } from "../../assets/icons";
import PublicHolidayDetails from "./PublicHolidayDetails";
import SvgLoading from "../spinners/SvgLoading";

function Custom({
  selectedDay,
  setSelectedDay,
  setShowCustomForm,
  showCustomForm,
}) {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    get_all_custome_leaves();
  }, [reload]);

  const get_all_custome_leaves = async () => {
    setIsData(true);
    let { data } = await get_custom_days();
    if (data.success) {
      setData(data.customOffDays);
    }
    setIsData(false);
  };

  return (
    <>
      {isData && <SvgLoading />}

      <Fragment>
        <div
          className={`w-full h-fit ${
            selectedDay ? "hidden" : "flex"
          } flex-row flex-wrap gap-6 py-[10px]`}
        >
          {!isData && data.length === 0 && (
            <h1 className="w-full text-center mt-24">
              Oops! There are no public holidays.
            </h1>
          )}

          {data &&
            !isData &&
            data?.map((day) => (
              <Customday
                key={day._id}
                day={day}
                setSelectedDay={setSelectedDay}
              />
            ))}
        </div>

        <SideModal open={showCustomForm}>
          <CustomdayForm
            mode="create"
            setSelectedDay={setSelectedDay}
            setShowCustomForm={setShowCustomForm}
            setData={setData}
            setReload={setReload}
          />
        </SideModal>

        {selectedDay && (
          <PublicHolidayDetails
            details={selectedDay}
            setSelectedDay={setSelectedDay}
            setReload={setReload}
            showCustomForm={showCustomForm}
            setShowCustomForm={setShowCustomForm}
            setData={setData}
          />
        )}
      </Fragment>
    </>
  );
}

export default Custom;
