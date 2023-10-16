const UserModel = require("../models/UserModel.js");
const { LeaveModel } = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { send_leave_requestmsg } = require("./email.js");
const assignLeaveTemplate = (ID, Name) => {
  let leaveTypes = [];
  const casualLeave = {
    leaveName: "Casual",
    offDays: 10,
    permissionRequired: false,
    leaveDescription: "",
    color: "blue",
    half_day_request: true,
    maxDays: 2,
    inclusive_offDays: false,
    leavesTaken: [],
    disable: false,
    count_halfDay_fullDay: false,
    priorNotice: "",
  };
  const sickLeave = {
    leaveName: "Sick",
    offDays: 10,
    permissionRequired: false,
    leaveDescription: "",
    half_day_request: true,
    inclusive_offDays: false,
    color: "red",
    maxDays: 2,
    disable: false,
    count_halfDay_fullDay: false,
    leavesTaken: [],
    priorNotice: "",
  };
  const annualLeave = {
    leaveName: "Annual",
    offDays: 14,
    permissionRequired: true,
    count_halfDay_fullDay: false,
    leaveDescription: "",
    half_day_request: false,
    color: "green",
    maxDays: 7,
    inclusive_offDays: false,
    disable: false,
    leavesTaken: [],
    priorNotice: "",
  };

  leaveTypes.push(casualLeave);
  leaveTypes.push(sickLeave);
  leaveTypes.push(annualLeave);

  const leaveData = {
    companyName: Name.toString(),
    companyID: ID.toString(),
    leaveTypes: [],
    weekDays: [1, 2, 3, 4, 5, 6],
    halfDays: [6],
    customOffDays: [],
  };

  return leaveData;
};
// update any attribute of any leave type
// passing both attribute name & value
const updateAttributeForLeave = async (req, res) => {
  const leaveNameToUpdate = req.params.leaveName; // Extract leave name from URL parameter
  const attributeToUpdate = req.params.attribute; // Extract attribute name from URL parameter
  const newValue = req.body.newValue; // New value from request body
  try {
    const filter = { "leaveTypes.leaveName": leaveNameToUpdate };
    const update = {
      $set: {
        [`leaveTypes.$.${attributeToUpdate}`]: newValue,
      },
    };
    const updatedLeave = await LeaveModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedLeave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave type not found" });
    }
    res.status(200).json({ success: true, updatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// push new leave request
// const addleave = async (req, res) => {
//   const { companyID, leaveType } = req.body;

//   try {
//     const data = await LeaveModel.findOne({
//       companyID,
//       "leaveTypes.leaveName": leaveType,
//     });

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "No Leave Found ",
//       });
//     }

//     const leaveTypes = data.leaveTypes;

//     let leave_obj = leaveTypes.find(
//       (obj) => obj.leaveName === req.body.leaveType
//     );

//     if (!leave_obj.sharedPool) {
//       let rem_days_num = 0;

//       if (leave_obj.leavesTaken) {
//         leave_obj.leavesTaken.map((element) => {
//           if (element.status === "Approved") {
//             rem_days_num += element.numberOfDays;
//           }
//         });
//       }

//       if (req.body.status === "Approved") {
//         rem_days_num += req.body.numberOfDays;
//       }

//       const updatedDocument = await LeaveModel.findOneAndUpdate(
//         {
//           companyID,
//           "leaveTypes.leaveName": leaveType,
//         },
//         {
//           $set: {
//             "leaveTypes.$.remaingDays": rem_days_num,
//           },
//           $push: {
//             "leaveTypes.$.leavesTaken": req.body,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       if (!updatedDocument) {
//         return res
//           .status(404)
//           .json({ message: "Leave document or leave type not found" });
//       }
//       res.status(200).json({ success: true, data: updatedDocument });
//     } else {
//       // sharedPoolWith
//       let remaingDays_of_sharedPoolWith = 0;
//       let remaingDays_of_current_leave_object = 0;

//       /// get remaing dasy of casual ashared
//       data.leaveTypes.map((objs) => {
//         if (objs.leaveName === leave_obj.sharedPoolWith) {
//           objs.leavesTaken.map((obj) => {
//             if (obj.status === "Approved") {
//               remaingDays_of_sharedPoolWith += obj.numberOfDays;
//             }
//           });
//         }
//       });

//       data.leaveTypes = data.leaveTypes.map((obj) => {
//         if (obj.leaveName === req.body.leaveType) {
//           obj.leavesTaken.map((obj) => {
//             if (obj.status === "Approved") {
//               remaingDays_of_current_leave_object += obj.numberOfDays;
//             }
//           });

//           if (req.body.status === "Approved") {
//             remaingDays_of_current_leave_object += req.body.numberOfDays;
//           }

//           obj.remaingDays =
//             remaingDays_of_current_leave_object + remaingDays_of_sharedPoolWith;
//           obj.leavesTaken.push({ ...req.body });
//         }
//         return obj;
//       });

//       //sahred casual
//       data.leaveTypes = data.leaveTypes.map((item) => {
//         if (
//           item.leaveName === leave_obj.sharedPoolWith &&
//           req.body.status === "Approved"
//         ) {
//           item.remaingDays =
//             remaingDays_of_current_leave_object + remaingDays_of_sharedPoolWith;
//         }
//         return item;
//       });

//       let updated_two = await data.save();
//       if (!updated_two) {
//         return res
//           .status(404)
//           .json({ message: "Leave document or leave type not found" });
//       }
//       res.status(200).json({ success: true, data: updated_two });
//     }

//     //
//   } catch (error) {
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

//get all leave for user
const getAllLeaves = async (req, res) => {
  const { companyID, email } = req.query;
  try {
    let document = await LeaveModel.findOne({ companyID });

    if (!document) {
      throw new Error(`No document found for companyID: ${companyID}`);
    }

    let totalOffDays = 0;
    let availed_total_count = 0;
    let particular_leave_availed_leangth = 0;
    let leaveTypes = document.leaveTypes;
    let get_total_leave_data = [];
    let data = leaveTypes.map((leave_object) => {
      totalOffDays += leave_object.offDays;

      // total days counted now
      get_total_leave_data = [];
      particular_leave_availed_leangth = 0;
      leave_object.leavesTaken.map((obj) => {
        // if email found
        // return all data
        // return availed data
        if (obj.email === email) {
          particular_leave_availed_leangth = obj.remaingDays;
          get_total_leave_data = [];
          availed_total_count += obj.remaingDays;
          get_total_leave_data.push(
            ...obj.availed_leaveData,
            ...obj.pending_leaveData,
            ...obj.rejected_leaveData
          );
        }
      });
      return {
        leave_object,
        get_total_leave_data,
        particular_leave_availed_leangth,
      };
    });

    res.status(200).json({
      success: true,

      data,
      totalOffDays,
      availed_total_count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const getWeekDaysAndHalfDays = async (req, res) => {
  const { companyID } = req.query;
  try {
    const schemaData = await LeaveModel.findOne({ companyID });

    const { weekDays, halfDays } = schemaData;
    res.status(200).json({ weekDays, halfDays });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLeaveTypes = async (req, res) => {
  const { companyID } = req.query;
  try {
    const schemaData = await LeaveModel.findOne({ companyID });
    const { leaveTypes } = schemaData;
    res.status(200).json({ leaveTypes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update_workingDays = async (req, res) => {
  const { companyID } = req.query;
  const data = req.body;
  try {
    const schemaData = await LeaveModel.findOne({ companyID });
    const { weekDays, halfDays } = schemaData;

    if (data.status) {
      // week day is on
      if (data.schedule === "fullday") {
        if (!weekDays.includes(data.number)) {
          weekDays.push(data.number);
          weekDays.sort((a, b) => {
            return parseInt(a) - parseInt(b);
          });
          schemaData.weekDays = weekDays;
        }
        let newHalfdays = halfDays.filter((num) => num != data.number);
        newHalfdays.sort((a, b) => {
          return parseInt(a) - parseInt(b);
        });
        schemaData.halfDays = newHalfdays;
      } else {
        if (!weekDays.includes(data.number)) {
          weekDays.push(data.number);
          weekDays.sort((a, b) => {
            return parseInt(a) - parseInt(b);
          });
          schemaData.weekDays = weekDays;
        }
        if (!halfDays.includes(data.number)) {
          halfDays.push(data.number);
          halfDays.sort((a, b) => {
            return parseInt(a) - parseInt(b);
          });
          schemaData.halfDays = halfDays;
        }
      }
    } else {
      if (weekDays.includes(data.number)) {
        let newWeekdays = weekDays.filter((num) => num != data.number);
        newWeekdays.sort((a, b) => {
          return parseInt(a) - parseInt(b);
        });
        schemaData.weekDays = newWeekdays;
      }
      if (halfDays.includes(data.number)) {
        let newHalfdays = halfDays.filter((num) => num != data.number);
        newHalfdays.sort((a, b) => {
          return parseInt(a) - parseInt(b);
        });
        schemaData.halfDays = newHalfdays;
      }
    }
    await schemaData.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const update_leave_attrs = async (req, res) => {
  const { companyID } = req.query;
  try {
    const data = await LeaveModel.findOneAndUpdate(
      {
        companyID,
        "leaveTypes._id": req.body._id,
      },
      {
        $set: {
          "leaveTypes.$": { ...req.body },
        },
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({ message: "Leave type updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// add new leave type which is not shared with any other leave

const deleteLeaveType = async (req, res) => {
  const { companyID, leaveName, email } = req.body;
  console.log("first");
  try {
    const data = await LeaveModel.findOne({
      companyID,
      "leaveTypes.leaveName": leaveName,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No Leave Found ",
      });
    }

    // get the leave object which you want to delete
    const leave_object_to_delete = data.leaveTypes.find(
      (obj) => obj.leaveName === req.body.leaveName
    );

    if (leave_object_to_delete.sharedPool) {
      data.leaveTypes.map((object) => {
        if (object.leaveName === leave_object_to_delete.sharedPoolWith) {
          object.sharedPool = false;
          object.sharedPoolWith = "";
          object.leavesTaken = object.leavesTaken.map((item) => {
            if (item.email === email) {
              item.remaingDays = item.availed_leaveData.length;
            }
            return item;
          });
        }
        return object;
      });
    }

    const updatedLeave = await data.save();

    if (!updatedLeave) {
      return res.status(500).json({
        success: false,
        message: "Failed to update leave data.",
      });
    }

    const result = await LeaveModel.updateOne(
      { companyID: companyID },
      { $pull: { leaveTypes: { leaveName: leaveName } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Leave type not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Leave type deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const add_custom_day = async (req, res) => {
  const { companyID } = req.query;

  try {
    const { customOffDays } = await LeaveModel.findOneAndUpdate(
      { companyID },
      { $push: { customOffDays: req.body } },
      { new: true }
    );

    if (!customOffDays) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Custom Leave Added successfully",
      updatedData: customOffDays,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const custome_days = async (req, res) => {
  const { companyID } = req.query;
  try {
    const company = await LeaveModel.findOne({ companyID });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const { customOffDays } = company;
    return res.status(200).json({ success: true, customOffDays });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const delete_custom_leave = async (req, res) => {
  const { companyID, customLeaveToDelete } = req.query;
  try {
    const data = await LeaveModel.findOneAndUpdate(
      { companyID },
      {
        $pull: {
          customOffDays: { _id: customLeaveToDelete },
        },
      },
      {
        new: true,
      }
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Leave type deleted successfully",
      updatedData: data?.customOffDays,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const update_custom_leave = async (req, res) => {
  const data = await LeaveModel.findOneAndUpdate(
    {
      "customOffDays._id": req.body._id,
    },
    {
      $set: {
        "customOffDays.$": { ...req.body },
      },
    },
    { new: true }
  );
  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });
  }
  if (data) {
    return res.status(200).json({
      success: true,
      message: "Custom off day updated successfully",
      updatedData: data?.customOffDays,
    });
  }
};

const update_leave_response = async (req, res) => {
  const { companyID, email } = req.query;
  const { data } = req.body;
  const { leaveResponse } = req.body;

  try {
    const document = await LeaveModel.findOne({
      companyID,
      "leaveTypes.leaveName": data.leaveName,
    });

    if (!document) {
      return res.status(404).json({ message: "Leavetype not found" });
    }

    let main_leave_obj = {};
    let leaves_taken_object = {};
    document.leaveTypes.map((object) => {
      if (object.leaveName === data.leaveName) {
        main_leave_obj = object;
        leaves_taken_object = object.leavesTaken.find(
          (obj) => obj.email === email
        );
      }
    });

    if (
      leaves_taken_object.remaingDays === main_leave_obj.offDays &&
      leaveResponse === "Approved"
    ) {
      return res.status(200).json({
        message: "Leave Permission already leaves availed totally",
      });
    }
    if (
      leaves_taken_object.remaingDays + data.numberOfDays >
        main_leave_obj.offDays &&
      leaveResponse === "Approved"
    ) {
      return res.status(200).json({
        message:
          "Cannot Accept Leave Permission already leaves availed totally",
      });
    }
    if (!main_leave_obj.sharedPool) {
      let nums = leaves_taken_object.remaingDays;
      if (leaveResponse === "Approved") {
        nums += data.numberOfDays;
      }
      document.leaveTypes.map((leaves) => {
        if (leaves.leaveName === main_leave_obj.leaveName) {
          leaves.leavesTaken = leaves.leavesTaken.map((obj) => {
            if (email === obj.email) {
              let _shipping_leave_object = {};
              obj.pending_leaveData = obj.pending_leaveData.filter((obj) => {
                if (obj._id.toString() === data._id) {
                  _shipping_leave_object = obj;
                } else {
                  return obj;
                }
              });

              if (leaveResponse === "Approved") {
                obj.remaingDays += _shipping_leave_object.numberOfDays;
                _shipping_leave_object.status = "Approved";
                obj.availed_leaveData.push(_shipping_leave_object);
              }
              if (leaveResponse === "Rejected") {
                obj.rejected_leaveData.push(_shipping_leave_object);
              }
            }
            return obj;
          });
        }
        return leaves;
      });
    }
    let updated_document = await document.save();
    if (!updated_document) {
      return res.status(404).json({
        success: false,
        message: "Could not change status, try again",
      });
    }
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// add simple leave, not shared with any other
const add_new_leave = async (req, res) => {
  const { companyID } = req.query;
  const leaveToAdd = req.body; // The new leave object to add
  const { leaveName } = req.body;

  try {
    const exist = await LeaveModel.findOne({
      companyID,
      "leaveTypes.leaveName": leaveName,
    });

    if (exist) {
      return res.status(404).json({
        success: false,
        message: "leave with same name already exist ",
      });
    }

    const result = await LeaveModel.updateOne(
      { companyID },
      { $push: { leaveTypes: leaveToAdd } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Leave Added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
// this function helps you add new leave type that is shared with some other leave.
const add_SharedPool_leave = async (req, res) => {
  const { companyID } = req.query;
  const { leaveName, sharedPoolWith } = req.body;

  try {
    // Check if a leave with the same name already exists
    const leaveExists = await LeaveModel.findOne({
      companyID,
      "leaveTypes.leaveName": leaveName,
    });

    if (leaveExists) {
      return res.status(404).json({
        success: false,
        message: "Leave with the same name already exists",
      });
    }

    // Check if the leave is already shared with another leave
    const leaveIsShared = await LeaveModel.findOne({
      $and: [
        {
          companyID: companyID,
        },
        { "leaveTypes.leaveName": req.body.leaveName },
        { "leaveTypes.sharedPool": true },
      ],
    });

    if (leaveIsShared) {
      return res.status(404).json({
        success: false,
        message: "Leave is already shared with another leave ok",
      });
    }

    //   // Add the new leave
    const addLeaveResult = await LeaveModel.updateOne(
      { companyID },
      { $push: { leaveTypes: req.body } }
    );

    if (addLeaveResult.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: "Could not add leave. Please try again.",
      });
    }

    // Update the sharedPoolWith for the existing leave
    if (req.body.sharedPool && sharedPoolWith) {
      const updateLeaveResult = await LeaveModel.updateOne(
        {
          companyID,
          "leaveTypes.leaveName": sharedPoolWith,
        },
        {
          $set: {
            "leaveTypes.$.sharedPoolWith": leaveName,
            "leaveTypes.$.sharedPool": true,
          },
        }
      );

      if (updateLeaveResult.nModified === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Could not update shared pool information. Please try again.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Leave added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addleave = async (req, res) => {
  const { companyID, email } = req.query;
  const { leaveType } = req.body;
  try {
    // Check if the companyID and leaveName match
    const leave = await LeaveModel.findOne({
      companyID,
      "leaveTypes.leaveName": leaveType,
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "CompanyID or leaveName does not match any records.",
      });
    }

    // Determine the appropriate sub-array based on req.body.status
    const subArrayToUpdate = getSubArrayToUpdate(req.body.status);

    // Find the leaveType that matches leaveType and create a newLeaveTakenEntry
    const casual_leave_object = leave.leaveTypes.find(
      (leave_obj) => leave_obj.leaveName === leaveType
    );

    if (!casual_leave_object) {
      return res.status(404).json({
        success: false,
        message: "LeaveType not found.",
      });
    }

    // Find the leavesTaken entry that matches email or create a new one
    let leavesTakenEntry = casual_leave_object.leavesTaken.find(
      (obj) => obj.email === email
    );

    if (!leavesTakenEntry) {
      leavesTakenEntry = {
        email,
        remaingDays: 0,
        availed_leaveData: [],
        pending_leaveData: [],
        rejected_leaveData: [],
      };
      casual_leave_object.leavesTaken.push(leavesTakenEntry);
    }

    let save_the_remaingDays_of_casual_leave = 0;
    casual_leave_object.leavesTaken.map((leave_obj) => {
      if (leave_obj.email === email) {
        leave_obj[subArrayToUpdate].push({ ...req.body });
        if (req.body.status === "Approved") {
          leave_obj.remaingDays += req.body.numberOfDays;
          save_the_remaingDays_of_casual_leave = leave_obj.remaingDays;
        }
      }
      return leave_obj;
    });
    if (casual_leave_object.sharedPool) {
      leave.leaveTypes.map((shared_casual_object) => {
        if (
          shared_casual_object.leaveName === casual_leave_object.sharedPoolWith
        ) {
          let shared_casual_leavesTaken_object =
            shared_casual_object.leavesTaken.find((obj) => obj.email === email);
          if (!shared_casual_leavesTaken_object) {
            let _get_the_leave_obj = {
              email,
              remaingDays: 0,
              availed_leaveData: [],
              pending_leaveData: [],
              rejected_leaveData: [],
            };
            shared_casual_object.leavesTaken.push(_get_the_leave_obj);
          }
        }
        return shared_casual_object;
      });

      leave.leaveTypes.map((leave_Object) => {
        if (leave_Object.leaveName === casual_leave_object.sharedPoolWith) {
          leave_Object.leavesTaken = leave_Object.leavesTaken.map((item) => {
            if (item.email === email) {
              item.remaingDays = save_the_remaingDays_of_casual_leave;
            }
            return item;
          });
        }
        return leave_Object;
      });
    }

    const updatedLeave = await leave.save();

    if (!updatedLeave) {
      return res.status(500).json({
        success: false,
        message: "Failed to update leave data.",
      });
    }
    let recc = [];

    req.body.reportingManager.map((item) => {
      recc.push(item.value);
    });
    req.body.seniorReportingManager.map((item) => {
      recc.push(item.value);
    });

    let result = await send_leave_requestmsg(email, recc, req.body.comments);

    if (!result) {
      return res.status(200).json({
        success: false,
        message: "Leave Added but email was not sent",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Leave data added successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
// Helper function to determine the appropriate sub-array based on status
function getSubArrayToUpdate(status) {
  switch (status) {
    case "Approved":
      return "availed_leaveData";
    case "Rejected":
      return "rejected_leaveData";
    case "Pending":
      return "pending_leaveData";
    default:
      throw new Error(
        'Invalid status value. It must be "Approved", "Rejected", or "Pending".'
      );
  }
}

module.exports = {
  assignLeaveTemplate,
  addleave,
  updateAttributeForLeave,
  getAllLeaves,
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
};
