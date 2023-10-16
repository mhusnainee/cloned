import { Fragment, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { companySettingTabs } from "../../utils/static";
import LogoSetting from "./LogoSetting";
import OtherSetting from "./OtherSetting";
import default_logo from "../../assets/default_logo.png";

function CompanySettings() {
  const [companySettings, setCompanySettings] = useState({});

  useEffect(() => {
    const logoFromDatabase = "";
    setCompanySettings({
      logo: logoFromDatabase || default_logo,
      other: "Other settings",
    });
  }, []);

  return (
    <div>
      <Tab.Group>
        <Tab.List className="w-full flex justify-start items-center duration-500 mb-[20px] pb-[20px]">
          {companySettingTabs.map((category) => (
            <Tab
              as={Fragment}
              key={category._id}
              className={({ selected }) =>
                `group text-[10px] sm:text-[16px] outline-none focus:outline-none border border-gray-100 mr-[5px] sm:mr-[10px] dark:border-sfy rounded-[5px] duration-500 w-fit h-[35px] sm:h-[40px] px-2 sm:px-3 flex items-center cursor-pointer ${
                  selected
                    ? "bg-gray-100 dark:bg-sfy dark:text-white"
                    : "text-black dark:text-sfy"
                } hover:bg-gray-100 dark:hover:bg-sfy dark:hover:text-white`
              }
            >
              {({ selected }) => (
                <button>
                  {category.icon}
                  <span
                    className={`${!selected && "hidden md:block"} ml-[10px]`}
                  >
                    {category.name}
                  </span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel>
            {companySettings.logo && (
              <LogoSetting logo={companySettings.logo} />
            )}
          </Tab.Panel>

          <Tab.Panel>
            <OtherSetting other={companySettings.other} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default CompanySettings;
