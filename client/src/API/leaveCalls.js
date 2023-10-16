import axios from "axios";

export const requestLeave = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/reqLeave";
  let res = await axios.post(sub_url, data, {
    params: {
      companyID: user.companyID,
      email: user.email,
    },
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const getLeaveDataByUserID = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/leaves";
  try {
    const response = await axios.get(sub_url, {
      params: {
        userID: user.email,
      },
      headers: {
        Authorization: `${user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving leave data:", error);
    throw error;
  }
};

export const rej_approve_annual_leave = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let res = await axios.post("/api/leave_response", data, {
    params: {
      companyID: user.companyID,
      email: user.email,
    },
    headers: {
      "Content-type": "Application/json",
      Authorization: `${user.token}`,
    },
  });
  return res;
};

export const getUserLeavesData = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.get("/api/get_all_leaves", {
      params: {
        companyID: user.companyID,
        email: user.email,
      },
      headers: {
        Authorization: `${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getworkdays = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get("/api/getweekdays", {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const update_weekDays_halfDays = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/update_workingDays", data, {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response.data;
};

export const getLeaveTypes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get("/api/getLeaveTypes", {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const update_leave_attributes = async (data, leaveName) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/update_leave_dataATTR", data, {
    params: {
      companyID: user.companyID,
      leaveName: leaveName,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const add_new_leaveType = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/add_new_leave", data, {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const delete_leaveType = async (leaveName) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let sub_url = "/api/del_Leave_Type";
  const data = {
    leaveName,
    companyID: user.companyID,
    email: user.email,
  };
  const response = await axios.post(sub_url, data, {
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const add_Custom_Leaveday = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/add_custom_Day", data, {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

// custom_days
export const get_custom_days = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get("/api/custom_days", {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};

export const delete_custom_leave = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get("/api/delete_custom_leave", {
    params: {
      companyID: user.companyID,
      customLeaveToDelete: _id,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};
// update_custom_leave
export const update_customLeave = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/update_custom_leave", data, {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });

  return response;
};

export const add_sharedPool_Leave = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post("/api/add_SharedPool_leave", data, {
    params: {
      companyID: user.companyID,
    },
    headers: {
      Authorization: `${user.token}`,
    },
  });
  return response;
};
