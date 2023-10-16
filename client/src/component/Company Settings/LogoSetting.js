import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { useSelector } from "react-redux";
import { getTheme } from "../../store/themeSlice";
import { loadingSvg } from "../../assets/icons";
import { toast } from "react-toastify";

const LogoSetting = React.memo(function LogoSetting({ logo }) {
  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const theme = useSelector(getTheme);

  const [logoSrc, setLogoSrc] = useState(logo);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);

    setTimeout(() => {
      setSubmitLoading(false);
      notify("Logo updated successfully!", "success");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[750px] space-y-8 text-black dark:text-sfy duration-500"
    >
      <h1 className="text-2xl font-semibold">Upload logo</h1>
      <div className="w-fit gap-12 flex flex-col  items-center">
        <div className="w-fit gap-4 smd:gap-8 flex flex-col smd:flex-row items-center">
          <Avatar
            width={300}
            height={200}
            onCrop={(e) => setLogoSrc(e)}
            onClose={() => setLogoSrc(logo)}
            borderStyle={{
              border: "2px dashed gray",
              borderColor: theme ? "#aa002d" : "",
              borderRadius: "8px",
              textAlign: "center",
            }}
            labelStyle={{
              color: theme ? "#aa002d" : "gray",
              fontSize: "1.25rem",
              fontWeight: 700,
              lineHeight: "295px",
              display: "inline-block",
              cursor: "pointer",
            }}
            cropColor={theme ? "#aa002d" : "white"}
            backgroundColor={theme ? "black" : "gray"}
          />

          <div className="flex flex-col items-center smd:items-start">
            <h1>Logo Preview</h1>

            <img
              src={logoSrc}
              height={80}
              width={80}
              alt="company logo"
              className="mt-2"
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          {submitLoading ? (
            <div className="flex items-center">
              {loadingSvg} Loading please wait...
            </div>
          ) : (
            <button
              type="submit"
              className="w-full px-8 py-2 rounded-md outlin-none bg-blue-600 hover:bg-blue-700 dark:bg-black/80 dark:hover:bg-black text-white duration-500"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
});

export default LogoSetting;
