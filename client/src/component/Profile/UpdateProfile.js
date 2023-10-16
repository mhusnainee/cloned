import React from "react";
import { useState } from "react";
import Avatar from "react-avatar-edit";
import { updateProfileInfo } from "../../auth/authService";

import {
  cnic,
  phone,
  dojIcon,
  atrate,
  addressIcon,
  whatsapp,
  linkedin,
  loadingSvg,
  name,
  offboarding,
} from "../../assets/icons";
import { toast } from "react-toastify";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import default_user_image from "../../assets/default_user_image.png";

const cnicIcon = cnic;

const UpdateProfile = ({ user, setReload }) => {
  const theme = useSelector(getTheme);

  const [imgSrc, setImgSrc] = useState(
    user?.profilePicture ? user.profilePicture : default_user_image
  );

  const [selectedDate, setSelectedDate] = useState(
    user?.dob ? new Date(user.dob) : ""
  );

  const [linkedInURL, setLinkedInURL] = useState(
    user?.LinkedInProfile ? user?.LinkedInProfile : ""
  );
  const [firstName, setFirstName] = useState(
    user?.firstName ? user?.firstName : ""
  );
  const [lastName, setlastName] = useState(
    user?.lastName ? user?.lastName : ""
  );
  const [middleName, setmiddleName] = useState(
    user?.middleName ? user.middleName : ""
  );
  const [cnic, setCnic] = useState(user?.cnicNumber ? user.cnicNumber : "");
  const [whatsappNumber, setWhatsappNumber] = useState(
    user?.phoneNumber ? user.phoneNumber : ""
  );
  const [gmailAddress, setGmailAddress] = useState(
    user?.gmailAddress ? user?.gmailAddress : ""
  );
  const [otherEmail, setOtherEmail] = useState(
    user?.otherEmailAddress ? user?.otherEmailAddress : ""
  );
  const [presentAddress, setPresentAddress] = useState(
    user?.presentAddress ? user?.presentAddress : ""
  );
  const [permanentAddress, setPermanentAddress] = useState(
    user?.permanentAddress ? user?.permanentAddress : ""
  );
  const [nok, setnok] = useState({
    nokName: user?.nok ? user.nok.nokName : "",
    nokContact: user?.nok ? user.nok.nokContact : "",
    nokRelation: user?.nok ? user.nok.nokRelation : "",
  });
  const [isloading, setIsloading] = useState(false);
  const onCrop = (e) => {
    setImgSrc(e);
  };

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      cnicNumber: cnic,
      gmailAddress: gmailAddress,
      otherEmailAddress: otherEmail,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
      LinkedInProfile: linkedInURL,
      dob: selectedDate,
      nok: nok,
      profilePicture: imgSrc,
      phoneNumber: whatsappNumber,
    };
    await updateProfileInfo(data)
      .then((res) => {
        if (res.data.success) {
          localStorage.removeItem("user");
          const userdata = JSON.stringify(res.data.userData);
          localStorage.setItem("user", userdata);
          setReload(Math.random());
          notify("Profile Updated Successfully!", "success");
        } else {
          notify("Something went Wrong, please try again!", "error");
        }
      })
      .catch((error) => {
        notify(error.message, "error");
      });
    setIsloading(false);
  };

  return (
    <div className="max-w-[750px] bg-gray-100 dark:bg-sfy p-6 rounded-md text-black dark:text-white duration-500">
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col">
          <div className="w-full px-4">
            <div className="border-b text-black dark:text-white dark:border-b-black duration-500 pb-1">
              <h1 className="text-xl">Profile picture</h1>
            </div>
          </div>

          <div className="w-full flex p-4 flex-col space-y-6">
            <div className="w-fit gap-4 smd:gap-6 flex flex-col smd:flex-row">
              <Avatar
                width={350}
                height={230}
                onCrop={(e) => onCrop(e)}
                borderStyle={{
                  border: "2px dashed gray",
                  borderColor: theme ? "white" : "rgba(128,128,128,0.3)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
                labelStyle={{
                  color: theme ? "white" : "gray",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  lineHeight: "295px",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                backgroundColor={theme ? "black" : "gray"}
              />
              <div>
                <div className="flex flex-col items-center smd:items-start">
                  <h1>Image Preview</h1>
                  <img
                    src={imgSrc}
                    alt="profile_picture"
                    className="mt-4 w-[80px] min-w-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4">
            <div className="border-b text-black dark:text-white dark:border-b-black duration-500 pb-1">
              <h1 className="text-xl">Personal information</h1>
            </div>
          </div>

          <div className="w-[250px] sm:w-full p-4 mx-auto grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {name}
                First Name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {name}
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {name}
                Middle Name
              </label>
              <input
                onChange={(e) => setmiddleName(e.target.value)}
                value={middleName}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {phone} Contact
              </label>
              <input
                onChange={(e) => setWhatsappNumber(e.target.value)}
                value={whatsappNumber}
                type="number"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {whatsapp} WhatsApp
              </label>
              <input
                onChange={(e) => setWhatsappNumber(e.target.value)}
                value={whatsappNumber}
                type="number"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {cnicIcon}Identification Number (ID)
              </label>
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                type="number"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {linkedin} LinkedIn Profile
              </label>
              <input
                value={linkedInURL}
                onChange={(e) => setLinkedInURL(e.target.value)}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {dojIcon} Date of Birth
              </label>

              <DatePicker
                id="dob"
                value={new Date(selectedDate)}
                placeholder={new Date().toDateString()}
                onChange={(e) => setSelectedDate(e.toDate())}
                format="MMM DD YYYY"
                inputClass="w-full outline-none bg-gray-50 dark:bg-sfy dark:text-white dark:placeholder:text-white/60 rounded-lg p-2.5 border border-gray-300 duration-500 text-sm placeholder:text-sm focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black"
                containerClassName="w-full"
                className={theme && "bg-dark"}
              />
            </div>
          </div>

          <div className="w-full px-4">
            <div className="border-b text-black dark:text-white dark:border-b-black duration-500 pb-1">
              <h1 className="text-xl">Email</h1>
            </div>
          </div>

          <div className="w-[250px] sm:w-full p-4 mx-auto grid gap-4   sm:grid-cols-2">
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {atrate} Official email
              </label>
              <input
                value={gmailAddress}
                onChange={(e) => setGmailAddress(e.target.value)}
                type="email"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {atrate} Personal email
              </label>
              <input
                type="email"
                value={otherEmail}
                onChange={(e) => setOtherEmail(e.target.value)}
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
          </div>

          <div className="w-full px-4">
            <div className="border-b text-black dark:text-white dark:border-b-black duration-500 pb-1">
              <h1 className="text-xl">Address</h1>
            </div>
          </div>

          <div className="w-[250px] sm:w-full p-4 mx-auto grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {addressIcon}Present Address
              </label>
              <input
                onChange={(e) => setPresentAddress(e.target.value)}
                value={presentAddress}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {addressIcon}Permanent Address
              </label>
              <input
                onChange={(e) => setPermanentAddress(e.target.value)}
                value={permanentAddress}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
          </div>

          <div className="w-full px-4">
            <div className="border-b text-black dark:text-white dark:border-b-black duration-500 pb-1">
              <h1 className="text-xl">Next of kin</h1>
            </div>
          </div>

          <div className="w-[250px] sm:w-full p-4 mx-auto grid gap-4 sm:grid-cols-2 ">
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {name} Name
              </label>
              <input
                type="text"
                value={nok.nokName}
                onChange={(e) => {
                  setnok({
                    ...nok,
                    nokName: e.target.value,
                  });
                }}
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {phone} Contact
              </label>
              <input
                value={nok.nokContact}
                onChange={(e) => {
                  setnok({
                    ...nok,
                    nokContact: e.target.value,
                  });
                }}
                type="number"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="mb-2 text-sm font-medium flex items-center gap-2">
                {offboarding} Relation
              </label>
              <input
                value={nok.nokRelation}
                onChange={(e) => {
                  setnok({
                    ...nok,
                    nokRelation: e.target.value,
                  });
                }}
                type="text"
                className="bg-gray-50 dark:bg-sfy border outline-none border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-black dark:focus:border-black duration-500 block w-full p-2.5 "
              />
            </div>
          </div>

          <div className="w-full px-4">
            <div className="border-b dark:border-b-black duration-500 pb-4 "></div>
          </div>

          <div className="flex items-center w-full justify-center mt-6">
            {!isloading ? (
              <button
                type="submit"
                className="text-white bg-blue-700 dark:bg-black/80 hover:bg-blue-800 dark:hover:bg-black text-center font-medium rounded-lg text-sm px-4 py-2.5 duration-500 items-center w-[200px] "
              >
                Submit
              </button>
            ) : (
              loadingSvg
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
