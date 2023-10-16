import React from "react";
import {
  envelop,
  BiometricID,
  phone,
  cnic,
  badge,
  dojIcon,
  atrate,
  linkIcon,
  addressIcon,
} from "../assets/icons";
const ProfileInfo = ({ selectedPerson }) => {
  return (
    <div className="flex flex-col items-center text-black dark:text-sfy duration-500">
      <div className="w-full border-b-2 dark:border-b-black duration-500 pb-1 flex justify-between items-center">
        <h1 className=" text-xl">Profile Information</h1>
      </div>
      <div className="w-full mt-2 flex flex-col space-y-7 sm:space-y-0 sm:flex-row items-center justify-center sm:justify-start space-x-7 border-b-2 pb-2 dark:border-b-black duration-500">
        <div className=" rounded-full h-[80px] w-[80px] overflow-hidden">
          <img src={selectedPerson?.profilePicture} alt="" className="" />
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-1 items-center">
            <h1 className="text-lg font-bold">
              {selectedPerson?.firstName + " " + selectedPerson?.lastName}
            </h1>
            {badge}
          </div>
          <h1 className="italic text-sm ">{selectedPerson?.designation}</h1>
        </div>
      </div>
      <div className="w-full ">
        <div className=" w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 md:gap-6  sm:grid-cols-2 ">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {envelop}
                <h1>User ID</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.email}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {BiometricID}
                <h1> Employee ID</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.empID}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {phone}
                <h1> WhatsApp #</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.phoneNumber}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>{" "}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {cnic}
                <h1> CNIC</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.cnicNumber}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>{" "}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Employment Status
            </label>
            <input
              disabled
              value={selectedPerson?.jobType}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {dojIcon}
                <h1> Date of Joining</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.doj}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {linkIcon}
                <h1> LinkedIn Profile</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.LinkedInProfile}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {dojIcon}
                <h1> Date of Birth</h1>
              </div>
            </label>
            <input
              disabled
              value={new Date(selectedPerson?.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              type="text"
              className="bg-gray-50 dark:bg-sfy dark:text-white duration-500 border-transparent  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="w-full  border-b-2 dark:border-b-black duration-500 pb-1  flex justify-between">
          <h1 className="font-bold text-lg">Email</h1>
        </div>
        <div className=" w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 md:gap-6  sm:grid-cols-2  ">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {atrate}
                <h1>Gmail</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.gmailAddress}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {atrate}
                <h1>other email</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.otherEmailAddress}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="w-full  border-b-2 dark:border-b-black duration-500 pb-1  flex justify-between">
          <h1 className="font-bold text-lg">Address</h1>
        </div>
        <div className=" w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 md:gap-6  sm:grid-cols-2 ">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {addressIcon}
                <h1>Permanent Address</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.permanentAddress}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {addressIcon}
                <h1>Present Address</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.presentAddress}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="w-full  border-b-2 dark:border-b-black duration-500 pb-1  flex justify-between">
          <h1 className="font-bold text-lg">Next Of Kin</h1>
        </div>
        <div className=" w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 md:gap-6  sm:grid-cols-2 ">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                <h1>Name</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokName}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                <h1>Relation</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokRelation}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-1">
                {phone}
                <h1>Contact #</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokContact}
              type="text"
              className="border-transparent bg-gray-50 dark:bg-sfy dark:text-white duration-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
