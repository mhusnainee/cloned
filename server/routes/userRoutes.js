const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");
const {
  loginUser,
  authUser,
  logOutUser,
  updateProfile,
  get_manager_data,
} = require("../controllers/userController");
const {
  get_all_users,
  reg_new_employee,
  get_all_users_emails,
  add_departmnet,
  get_departments,
  archive_user,
  get_all_archived_users,
} = require("../controllers/CompanyControllers");
const {
  newDocument,
  getDocument,
  uploadDocuments_to_AWS,
  get_submitted_docs,
  approve_document,
  getDocObjects_forEvents,
  set_reportingManager,
  set_Senior_reportingManager,
  update_edit_fields,
  new_leave_request,
  getLeaveDataByUserID,
  rej_approve_leave,
} = require("../controllers/commonControllers");

const {
  getAllLeaves,
  addleave,
  getWeekDaysAndHalfDays,
  update_workingDays,
  getLeaveTypes,
  update_leave_attrs,
  add_new_leave,
  deleteLeaveType,
  add_custom_day,
  custome_days,
  delete_custom_leave,
  update_custom_leave,
  update_leave_response,
  add_SharedPool_leave,
} = require("../controllers/leaveControllers.js");

const { send_docChanges_mail } = require("../controllers/email");

router.post("/login", loginUser);
router.get("/auth", auth, authUser);
router.get("/logout", auth, logOutUser);

// register routes
router.post("/register", auth, reg_new_employee);
router.post("/setRM", auth, set_reportingManager);
router.post("/setSRM", auth, set_Senior_reportingManager);

// get routes
router.get("/get_all_users", auth, get_all_users);
router.get("/getUserEmailsOnly/:id", auth, get_all_users_emails);

// archive a user
router.get("/archive_user", auth, archive_user);

router.get("/get_all_archived_users", auth, get_all_archived_users);

// update routes
router.post("/updateprofile", auth, updateProfile);
router.post("/edfields", auth, update_edit_fields);

// document routes
router.post("/reqdoc", auth, newDocument);
router.post("/docChanges", auth, send_docChanges_mail);
router.get("/getdocs/:id", auth, getDocument);
router.post("/approve_doc", auth, approve_document);
router.get("/docFollowers/:id", auth, getDocObjects_forEvents);
router.get("/get_Submitted_docs/:id", auth, get_submitted_docs);

// leave routes
router.get("/get_all_leaves", getAllLeaves);
router.post("/reqLeave", auth, addleave);
router.post("/leave_response", auth, update_leave_response);

// leave_response

router.get("/getweekdays", auth, getWeekDaysAndHalfDays);
router.post("/update_workingDays", auth, update_workingDays);
router.get("/getLeaveTypes", auth, getLeaveTypes);
router.post("/update_leave_dataATTR", auth, update_leave_attrs);
router.post("/add_new_leave", auth, add_new_leave);
router.post("/del_Leave_Type", auth, deleteLeaveType);
router.post("/add_custom_Day", auth, add_custom_day);
router.get("/custom_days", auth, custome_days);
router.get("/delete_custom_leave", auth, delete_custom_leave);
router.post("/update_custom_leave", auth, update_custom_leave);

router.post("/add_SharedPool_leave", auth, add_SharedPool_leave);

router.post("/updocs", auth, upload.array("files"), uploadDocuments_to_AWS);

/// department endpoints
router.post("/add_departmnet", auth, add_departmnet);
router.get("/departments/:id", auth, get_departments);

// user controller
router.get("/get_managers", auth, get_manager_data);
module.exports = router;
