import React, { useEffect, useState } from "react";
import pdfIcon from "../assets/pdf.png";
import {
  get_submitted_docs,
  approve_doc,
  sendChanges_mail,
} from "../API/documentCalls";
import { xmark, loadingSvg } from "../assets/icons";
import { toast } from "react-toastify";
import SvgLoading from "../component/spinners/SvgLoading";

const SharedDocs = ({ selectedPerson }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState();
  const [Open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [emailText, setEmailText] = useState("");

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    get_submitted_docs(selectedPerson.email).then((res) => {
      if (res.data) {
        setData(res.data.documents);
      }
      setLoading(false);
    });
  };

  const handleDownload = (item) => {
    let name = item.split("https://emsbucket.s3.amazonaws.com/");
    const link = document.createElement("a");
    link.href = item;
    link.setAttribute("download", `${name[1]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handle_approveDoc = async () => {
    setLoading(true);
    const data = {
      user: selectedPerson.email,
      doc_id: selected._id,
    };
    await approve_doc(data)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          notify("Document Approved Successfully!", "success");
        }
      })
      .catch((error) => {
        setLoading(false);
        notify(error.message, "error");
      });
  };

  const handleMail = async () => {
    const data = {
      email: selected.assignee,
      mailtext: emailText,
    };

    await sendChanges_mail(data)
      .then((res) => {
        if (res.data.sent) {
          notify("Message Sent Successfully!", "success");
        } else {
          notify("Message Not Sent!", "success");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(error.message, "success");
      });
  };

  if (showModel) {
    return (
      <div className="w-full">
        <div className="border-b pb-2 flex items-center justify-between">
          <h1 className="text-xl font-mono">Send Email</h1>
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              setShowModel(false);
            }}
          >
            {xmark}
          </div>
        </div>

        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          className="w-full "
        ></textarea>
        <div>
          {loading && (
            <div role="status" className="mt-2">
              {loadingSvg}
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!loading && (
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                handleMail();
              }}
              className="text-white dark:bg-black/60 dark:hover:bg-black duration-500 bg-blue-700 mt-2 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  items-center "
            >
              Send email
            </button>
          )}
        </div>
      </div>
    );
  }

  if (Open) {
    return (
      <div className="w-full dark:text-sfy duration-500">
        <div className="border-b dark:border-b-black  pb-2 flex items-center justify-between">
          <h1 className="text-xl font-mono">Selected Document</h1>
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              setselected(null);
              setOpen(false);
            }}
          >
            {xmark}
          </div>
        </div>

        <div className="mt-2">
          <h1>
            <span className="font-bold font-mono">
              Requested Documenet Name{" "}
            </span>{" "}
            : {selected.documentName}
          </h1>

          <div>
            <p>
              <span className="font-bold font-mono">Note </span>:{" "}
              {selected.note}
            </p>
          </div>

          <div>
            <h1 className="mt-4 mb-4 border-b dark:border-b-black  font-mono">
              Submitted Documents "{selected.images.length}"
            </h1>
            <div className="flex flex-wrap md:space-x-3">
              {selected.images.map((item, index) => (
                <div key={index}>
                  {item.includes("doc") || item.includes("pdf") ? (
                    <div className="h-16 w-16 mt-3 mb-3 cursor-pointer">
                      <img
                        src={pdfIcon}
                        alt="./"
                        onClick={() => {
                          handleDownload(item);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16  mt-3 mb-3 cursor-pointer">
                      <img
                        src={item}
                        alt=""
                        className="h-16 w-16"
                        onClick={() => {
                          handleDownload(item);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 mb-6 w-full dark:border-t-black flex space-x-3 border-t pt-1 items-center">
            {!loading && (
              <button
                type="button"
                onClick={handle_approveDoc}
                className="text-white bg-blue-700 duration-500 dark:bg-black/60 dark:hover:bg-black mt-2 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  items-center "
              >
                Approve Documents
              </button>
            )}

            {loading && (
              <div role="status">
                {loadingSvg}
                <span className="sr-only">Loading...</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowModel(true)}
              className="text-white duration-500 dark:bg-black/60 dark:hover:bg-black bg-blue-700 mt-2 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  items-center "
            >
              Request Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white w-full rounded-md text-black dark:text-sfy duration-500">
      <div className="border-b-2 dark:border-b-black duration-500 pb-2">
        <h1 className="text-xl">Shared Documents</h1>
      </div>
      {loading && <SvgLoading />}
      {data?.length > 0 ? (
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {data.map((item, index) => (
              <div
                onClick={() => {
                  setselected(item);
                  setOpen(true);
                }}
                className="my-1 px-1 w-full  lg:my-4 lg:px-4  bg-orange-50 p-3 dark:bg-sfy dark:text-white duration-500 rounded-md sm:ml-3 hover:bg-slate-100 hover:cursor-pointer"
                key={index}
              >
                <div className="text-xl border-b ">{item.documentName}</div>
                <div className="mt-3">
                  Submitted files : {item.images.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="mt-4 text-black">
            {data && data.length === 0 ? (
              <div>
                <h1> No Documents</h1>
              </div>
            ) : (
              loadingSvg
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SharedDocs;
