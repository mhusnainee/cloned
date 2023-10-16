import {
  envelop,
  BiometricID,
  phone,
  cnic,
  badge,
  dojIcon,
  atrate,
  addressIcon,
  whatsapp,
  bag,
  linkedin,
  name,
  offboarding,
} from "../../assets/icons";
import default_user_image from "../../assets/default_user_image.png";

const ProfileInfo = ({ selectedPerson }) => {
  return (
    <div className="max-w-[750px] flex flex-col items-center text-black dark:text-white duration-500 bg-gray-100 dark:bg-sfy rounded-md p-6">
      <div className="w-full px-4 md:px-6">
        <div className="w-full mt-2 flex flex-col space-y-7 sm:space-y-0 sm:flex-row items-center justify-center sm:justify-start space-x-7 border-b pb-4 text-black dark:text-white dark:border-b-black duration-500">
          <div className="rounded-full h-[100px] w-[100px] overflow-hidden">
            <img
              src={selectedPerson?.profilePicture ?? default_user_image}
              alt="profile_picture"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1 items-center">
              <h1 className="text-md md:text-lg font-bold">
                {selectedPerson?.firstName +
                  " " +
                  selectedPerson?.middleName +
                  " " +
                  selectedPerson?.lastName}
              </h1>
              {badge}
            </div>
            <h1 className="italic text-sm">{selectedPerson?.designation}</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-[250px] sm:w-full md:px-6 md:py-4 p-4 mx-auto grid gap-4 md:gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {envelop}
                <h1>User ID</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.email || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {BiometricID}
                <h1> Employee ID</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.empID || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {phone}
                <h1>Contact</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.phoneNumber || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {whatsapp}
                <h1>WhatsApp</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.whatsapp || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {cnic}
                <h1>CNIC</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.cnicNumber || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <div className="mb-1 text-sm font-medium flex items-center">
              {bag}
              <h1>Employment Status</h1>
            </div>
            <input
              disabled
              value={selectedPerson?.jobType || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {linkedin}
                <h1> LinkedIn Profile</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.LinkedInProfile || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {dojIcon}
                <h1> Date of Joining</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.doj || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
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
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
        </div>

        <div className="px-6 sm:px-4 md:px-6">
          <div className="w-full border-b dark:border-b-black duration-500 flex justify-between pb-1">
            <h1 className="font-semibold text-lg text-black dark:text-white duration-500">
              Email
            </h1>
          </div>
        </div>

        <div className=" w-[250px] sm:w-full md:px-6 md:py-4 p-4 mx-auto grid gap-4 md:gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {atrate}
                <h1>Official email</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.gmailAddress || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {atrate}
                <h1>Personal email</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.otherEmailAddress || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
        </div>
        <div className="px-6 sm:px-4 md:px-6">
          <div className="w-full border-b dark:border-b-black duration-500 flex justify-between pb-1">
            <h1 className="font-semibold text-lg text-black dark:text-white duration-500">
              Address
            </h1>
          </div>
        </div>
        <div className="w-[250px] sm:w-full md:px-6 md:py-4 p-4 mx-auto grid gap-4 md:gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {addressIcon}
                <h1>Permanent Address</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.permanentAddress || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {addressIcon}
                <h1>Present Address</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.presentAddress || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
        </div>

        <div className="px-6 sm:px-4 md:px-6">
          <div className="w-full border-b dark:border-b-black duration-500 flex justify-between pb-1">
            <h1 className="font-semibold text-lg text-black dark:text-white duration-500">
              Next of kin
            </h1>
          </div>
        </div>

        <div className="w-[250px] sm:w-full md:px-6 md:py-4 p-4 mx-auto grid gap-4 md:gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {name}
                <h1>Name</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokName || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {offboarding}
                <h1>Relation</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokRelation || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              <div className="flex items-center space-x-2">
                {phone}
                <h1>Contact</h1>
              </div>
            </label>
            <input
              disabled
              value={selectedPerson?.nok?.nokContact || "Not filled"}
              type="text"
              className="border-transparent bg-transparent dark:text-white duration-500 text-gray-900 text-sm block w-full p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
