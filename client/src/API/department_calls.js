import axios from "axios";
export const add_department = async (name) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let data = {
    companyID: user.companyID,
    companyName: user.companyName,
    departmentName: name,
  };
  let res = await axios.post("/api/add_departmnet", data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const getdepartments = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let res = await axios.get("/api/departments/" + user.companyID, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const get_managers = async (email) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get("/api/get_managers", {
    params: {
      email: email,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return res;
};
