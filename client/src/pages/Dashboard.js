import React from "react";
import Sidebarr from "../component/Sidebarr";
// import Panel from "./Panel";
// import Register from "../component/Register";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import RequireAuth from "../HOC/RequireAuth";
import { allowed_Registration_roles } from "../utils/allowedRoles";
import RequestDoc from "../component/RequestDoc";
import Setting from "../component/Setting";
import MyEvents from "./MyEvents";
import SharedDocs from "./SharedDocs";
// import UploadDocs from "./UploadDocs";
import Dashboardd from "../component/Dashboard/Dashboard";
import ManageHR from "./ManageHR";
import Roster from "./Roster";
import Documents from "./Documents";
import Profile from "./Profile";

const Dashboard = () => {
  return (
    <Sidebarr>
      <Routes>
        <Route path="/" element={<Dashboardd />} />
        <Route element={<RequireAuth allowedRoles={"Roster Manager"} />}>
          <Route path="/roster" element={<Roster />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={"Settings Manager"} />}>
          <Route path="settings" element={<Setting />} />
        </Route>
        {/* <Route path="settings" element={<Setting />} /> */}
        <Route path="leaves" element={<MainPage />} />
        <Route path="calendar" element={<MyEvents />} />
        <Route path="sharedocs" element={<SharedDocs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="documents" element={<Documents />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={"HR Manager"} />}>
          <Route path="managehr" element={<ManageHR />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[allowed_Registration_roles]} />}
        >
          <Route path="reqdoc" element={<RequestDoc />} />
        </Route>
      </Routes>
    </Sidebarr>
  );
};

export default Dashboard;
