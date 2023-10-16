import { useState } from "react";
import Settings from "./Leave Settings/Settings";
import Tab from "./Leave Settings/Tab";
import { tabData } from "../utils/static";
import Departments from "./Departments/Departments";
import CompanySettings from "./Company Settings/CompanySettings";

function Setting() {
  const [tab, setTab] = useState("Leave settings");

  return (
    <>
      <div className={`w-full h-fit flex flex-col justify-start items-center`}>
        <div className="w-full h-[40px] flex justify-between items-center">
          <div className="w-fit h-full flex justify-start items-center">
            {tabData.map((el) => (
              <Tab key={el._id} data={el} tab={tab} setTab={setTab} />
            ))}
          </div>
        </div>

        <hr className="w-full my-[20px] border border-gray-100 dark:border-black duration-500"></hr>
      </div>

      {tab === "Leave settings" && <Settings />}
      {tab === "Departments" && <Departments />}
      {tab === "Company settings" && <CompanySettings />}
    </>
  );
}

export default Setting;
