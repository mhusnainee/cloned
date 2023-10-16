import { Link, useLocation } from "react-router-dom";
import {
  homeIcon,
  roster,
  calenderIcon,
  uploadDoc,
  settingsIcon,
  leave,
  manageHR,
  userIcon,
  themeIcon,
  signOutIcon,
  sidebarIcon,
} from "../assets/icons";
import { fetchAuthToken } from "../auth/authToke";
import { useState } from "react";
import { signOut } from "../auth/authService";
import { Dropdown, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { set } from "../store/themeSlice";
import default_user_image from "../assets/default_user_image.png";

const Sidebarr = ({ children }) => {
  const dispatch = useDispatch();
  const [user] = useState(fetchAuthToken());
  const [open, setopen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="">
      <nav className="duration-500 fixed top-0 z-50 w-full border-b border-b-slate-200 dark:border-b-black bg-white text-black dark:bg-black dark:text-white">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setopen(!open)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-[#aa002d] focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <span className="sr-only">Open sidebar</span>
                {sidebarIcon}
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                  EMS
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end text-sm text-gray-700 dark:text-gray-200">
                <span className="block text-sm font-bold]">
                  {user?.empID ?? ""}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </div>

              <div className="relative flex items-center justify-start ml-3">
                <Dropdown
                  label={
                    <Avatar
                      alt="User settings"
                      img={user.profilePicture ?? default_user_image}
                      rounded={true}
                    />
                  }
                  arrowIcon={false}
                  inline={true}
                  className="dark:!bg-black !border !mt-2 !w-[150px]"
                >
                  <Dropdown.Item
                    className="dark:hover:!bg-sfy gap-x-2.5"
                    onClick={() => dispatch(set())}
                  >
                    {themeIcon}
                    Toggle theme
                  </Dropdown.Item>
                  <div className="my-1 h-px bg-gray-100 dark:bg-white"></div>

                  <Dropdown.Item as="link" className="dark:hover:!bg-sfy">
                    <Link
                      to="/profile"
                      role="menuitem"
                      className="w-full h-full flex items-center gap-x-1.5"
                    >
                      {userIcon}
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <div className="my-1 h-px bg-gray-100 dark:bg-white"></div>

                  <Dropdown.Item
                    className="dark:hover:!bg-sfy gap-x-2.5"
                    onClick={() => signOut()}
                  >
                    {signOutIcon}
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={` fixed top-0 left-0 z-40 w-64 h-screen pt-20 duration-[500ms] -translate-x-full bg-white dark:bg-black text-black dark:text-white border-r border-gray-200 dark:border-none  lg:translate-x-0
        ${open ? "translate-x-0" : ""}
        `}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500 rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                  path === "/" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                }`}
              >
                <div className="w-[10%] h-full">{homeIcon}</div>
                <div className="w-[80%] h-full">
                  <span className="ml-3">Home</span>
                </div>
              </Link>
            </li>
            {user?.permissions.includes("HR Manager") && (
              <li>
                <Link
                  to="/managehr"
                  className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                    path === "/managehr" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                  }`}
                >
                  <div className="w-[10%] h-full">{manageHR}</div>
                  <div className="w-[80%] h-full">
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Manage HR
                    </span>
                  </div>
                </Link>
              </li>
            )}
            {
              //
              user?.permissions.includes("Roster Manager") && (
                <li>
                  <Link
                    to="roster"
                    className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                      path === "/roster" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                    }`}
                  >
                    <div className="w-[10%] h-full">{roster}</div>
                    <div className="w-[80%] h-full">
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Roster
                      </span>
                    </div>
                  </Link>
                </li>
              )
            }
            <li>
              <Link
                to="documents"
                className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                  path === "/documents" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                }`}
              >
                <div className="w-[10%] h-full">{uploadDoc}</div>
                <div className="w-[80%] h-full">
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Documents
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="calendar"
                className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                  path === "/calendar" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                }`}
              >
                <div className="w-[10%] h-full">{calenderIcon}</div>
                <div className="w-[80%] h-full">
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Calendar
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="leaves"
                className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                  path === "/leaves" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                }`}
              >
                <div className="w-[10%] h-full">{leave}</div>
                <div className="w-[80%] h-full">
                  <span className="flex-1 ml-3 whitespace-nowrap">Leaves</span>
                </div>
              </Link>
            </li>
            {user?.permissions.includes("Settings Manager") && (
              <li>
                <Link
                  to="settings"
                  className={`flex items-center p-2 text-base font-normal transition-[background-color] duration-500  rounded-lg hover:bg-gray-100 dark:hover:bg-[#aa002d] ${
                    path === "/settings" ? "bg-gray-100 dark:bg-[#aa002d]" : ""
                  }`}
                >
                  <div className="w-[10%] h-full">{settingsIcon}</div>
                  <div className="w-[80%] h-full">
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Settings
                    </span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="p-4 lg:ml-64 mt-14 ">{children}</div>
    </div>
  );
};

export default Sidebarr;
