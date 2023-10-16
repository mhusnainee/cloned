import React, { useState, useEffect } from "react";
import { get_documents, upload_document } from "../API/documentCalls";
import { xmark, loadingSvg } from "../assets/icons";
import { fetchAuthToken } from "../auth/authToke";
import { toast } from "react-toastify";
import SvgLoading from "../component/spinners/SvgLoading";

const UploadDocs = () => {
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setselected] = useState();
  const [images, setImages] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setDataLoading(true);
    await get_documents().then((res) => {
      if (res.data.documents) {
        setdata(res.data.documents);
      }
      setDataLoading(false);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = fetchAuthToken();
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append("user", user.email);
    formData.append("docID", selected._id);
    setSubmitLoading(true);
    await upload_document(formData)
      .then((res) => {
        notify("Documents submitted successfully!", "success");
        setImages([]);
      })
      .catch((err) => {
        notify(err.message, "error");
      });
    setSubmitLoading(false);
  };

  if (open) {
    return (
      <div className="w-full md:w-[750px] text-black dark:text-sfy duration-500">
        <form
          onSubmit={handleSubmit}
          className=" bg-white w-full  p-4 rounded-md"
        >
          <div className="border-b dark:border-b-black duration-500 pb-4 flex items-center justify-between">
            <div>
              <h1>Selected Document</h1>
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setselected(null);
                setOpen(false);
                setImages([]);
              }}
            >
              {xmark}
            </div>
          </div>

          <div className="mt-2 w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Document Name
              </label>
              <input
                disabled
                value={selected.documentName}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 text-gray-900 dark:text-white duration-500 text-sm rounded-lg block w-full p-2.5 "
                placeholder="cnic"
              />
            </div>{" "}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Document Due Date
              </label>
              <input
                disabled
                value={selected.dueDate}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 text-gray-900 dark:text-white duration-500 text-sm rounded-lg block w-full p-2.5 "
                placeholder="cnic"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Document Note
              </label>
              <textarea
                disabled
                value={selected.note}
                type="text"
                className="bg-gray-50 dark:bg-sfy border border-gray-300 text-gray-900 dark:text-white duration-500 text-sm rounded-lg block w-full p-2.5 "
                placeholder="front & back, black & white"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Upload files
              </label>
              <input
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                }}
                required
                multiple
                type="file"
                className="bg-gray-50 dark:bg-sfy border duration-500 border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg dark:focus:ring-black dark:focus:border-black block w-full p-2.5 "
              />
            </div>
          </div>
          <div className="flex items-center min-w-[250px] justify-center mt-6">
            {submitLoading && (
              <div role="status" className="flex items-center">
                {loadingSvg}
                <span>Loading please wait...</span>
              </div>
            )}
            {!submitLoading && (
              <button
                type="submit"
                className="text-white bg-blue-700 dark:bg-black/80 hover:bg-blue-800 dark:hover:bg-black focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  items-center w-[120px] "
              >
                Submit
              </button>
            )}
          </div>
        </form>
        {images?.length !== 0 && (
          <div className="px-[3rem] mt-2 flex flex-col">
            <div className="border-b dark:border-black duration-500 pb-2">
              <h1>Selected Images</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-2 mt-3">
              {images.map((item, i) => {
                return (
                  <div
                    className="w-full h-[40px] p-4 text-gray-900 bg-slate-200 dark:bg-sfy dark:text-white duration-500 flex items-center justify-between rounded-[5px]"
                    key={i}
                  >
                    <div className="">
                      <h1 className="text-sm">{item.name}</h1>
                    </div>
                    <div
                      onClick={() => {
                        setImages(images.filter((item, index) => index !== i));
                      }}
                      className="cursor-pointer"
                    >
                      {xmark}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {dataLoading ? (
        <div className="max-w-[750px]">
          <SvgLoading />
        </div>
      ) : (
        <div className="md:w-[750px] bg-white w-full text-black dark:text-sfy duration-500 rounded-md">
          <div className="border-b dark:border-b-black duration-500 pb-2">
            <h1 className="text-xl">Upload Document</h1>
          </div>
          <div className="container">
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full py-4">
                {data.map((item, index) => (
                  <div
                    onClick={() => {
                      setselected(item);
                      setOpen(true);
                    }}
                    className="p-3 w-full bg-orange-50 dark:bg-sfy dark:hover:bg-black text-black dark:text-white duration-500 rounded-md hover:bg-slate-100 hover:cursor-pointer"
                    key={index}
                  >
                    <div className="text-xl border-b ">{item.documentName}</div>
                    <p className="block mt-2  border-b text-sm h-[30px] truncate overflow-hidden overflow-ellipsis ">
                      {item.note}
                    </p>
                    <div className="flex mt-1 space-x-1">
                      <div>Due Date: </div>
                      <p className="text-red-600 dark:text-white/50 duration-500">
                        {item.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-black">
                <h1>Oops! No Documents found</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDocs;
