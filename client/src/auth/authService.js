import axios from "axios";
axios.defaults.withCredentials = true;
export const login_User = async (data) => {
  let sub_url = "/api/login";
  let res = await axios
    .post(sub_url, data)
    .then((response) => {
      if (response.data.auth) {
        const userdata = JSON.stringify(response.data.userData);
        localStorage.setItem("token", userdata.token);
        localStorage.setItem("user", userdata);
        return response;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return res;
};

export const register_User = async (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const event = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = event.toLocaleDateString(undefined, options);

  const data = {
    ...values,
    email: values.loginID,
    empID: values.empID,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    role: values.empRoles,
    status: values.empStatus,
    jobType: values.empType,
    doj: values?.doj ? values.doj : date,
    designation: values.designation,
    permissions: values.permissions,
    reportingManager: values.reportingManager,
    seniorReportingManager: values.seniorReportingManager,
    archived: false,
  };

  let sub_url = "api/register";

  let res = await axios.post(sub_url, data, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });

  return res;
};

export const get_User_Auth = () => {
  const token = localStorage.getItem("token");
  axios
    .get("/api/users/auth", {
      headers: {
        "content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_users = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  let result = await axios.get("/api/get_all_users/", {
    params: {
      companyID: user.companyID,
    },
    headers: {
      "content-Type": "application/json",
      Authorization: `${user.token}`,
    },
  });

  return result;
};

export const get_users_emails_only = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let id = user.companyID;
  let sub_url = "/api/getUserEmailsOnly/";
  let res = null;
  await axios
    .get(sub_url + id, {
      headers: {
        "content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    })
    .then(function (response) {
      res = response;
    })
    .catch(function (error) {
      res = error;
    });
  return res;
};
export const set_editFields = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/edfields";
  let res = axios
    .post(sub_url, data, {
      headers: {
        "content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
  return res;
};

export const updateProfileInfo = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let res = axios
    .post("/api/updateProfile", data, {
      headers: {
        "content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
  return res;
};

export const signOut = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/logout";
  await axios
    .get(sub_url, {
      headers: {
        "content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    })
    .then(function (response) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const archive_user = async (email) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let response = await axios.get("/api/archive_user", {
    params: {
      companyID: user.companyID,
      email: email,
    },
    headers: {
      "content-Type": "application/json",
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const get_archived_users = async () => {
  // get_all_archived_users
  const user = JSON.parse(localStorage.getItem("user"));
  let response = await axios.get("/api/get_all_archived_users", {
    params: {
      companyID: user.companyID,
    },
    headers: {
      "content-Type": "application/json",
      Authorization: `${user.token}`,
    },
  });
  return response;
};
