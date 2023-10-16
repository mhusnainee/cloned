import axios from "axios";

export const newDoc = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/reqdoc";
  let res = await axios.post(sub_url, data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const get_documents = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/getdocs/";
  let res = await axios.get(sub_url + user.email, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const upload_document = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let res = await axios.post("/api/updocs", data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const get_submitted_docs = async (email) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/get_Submitted_docs/";
  let res = await axios.get(sub_url + email, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const approve_doc = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/approve_doc";
  let res = await axios.post(sub_url, data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const get_shared_doc_events = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/docFollowers/";
  let res = await axios.get(sub_url + user.email, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const sendChanges_mail = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/docChanges";
  let res = await axios.post(sub_url, data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const set_reportingManager = async (data, type) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = type === "Reporting Manager" ? "/api/setRM" : "/api/setSRM";
  let res = await axios.post(sub_url, data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};
