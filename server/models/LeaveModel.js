const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const customschema = new Schema({
  name: {
    required: true,
    type: String,
  },
  offDate: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  days: {
    required: true,
    type: Number,
  },
  multiDates: [],

  picture: {
    type: String,
  },
});

const single_leave_obj = new Schema({
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  numberOfDays: {
    type: Number,
  },
  reportingManager: [],
  seniorReportingManager: [],
  comments: {
    type: String,
  },
  status: {
    type: String,
  },
  half_info: {
    type: String,
  },
  leaveName: {
    type: String,
  },
});

const leavesTaken_object = new Schema({
  email: {
    required: true,
    type: String,
  },
  remaingDays: { type: Number },
  availed_leaveData: [single_leave_obj],
  pending_leaveData: [single_leave_obj],
  rejected_leaveData: [single_leave_obj],
});

const leaveSchema = new Schema({
  leaveName: {
    required: true,
    type: String,
  },

  offDays: {
    required: true,
    type: Number,
  },
  permissionRequired: {
    type: Boolean,
  },
  leaveDescription: {
    type: String,
  },

  color: {
    type: String,
  },
  maxDays: {
    type: Number,
  },

  leavesTaken: [leavesTaken_object],

  countHalfDayFullDay: {
    type: Boolean,
  },
  disable: {
    type: Boolean,
  },
  halfDayRequest: {
    type: Boolean,
  },
  inclusiveOffDays: {
    type: Boolean,
  },

  sharedPool: {
    type: Boolean,
  },
  sharedPoolWith: {
    type: String,
  },

  carryForward: {
    type: Number,
  },
  noticePeriod: {
    type: String,
  },
  proRata: {
    type: Boolean,
  },
});

const leavesSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },

  companyID: {
    required: true,
    type: String,
  },

  leaveTypes: [leaveSchema],
  weekDays: [],
  halfDays: [],
  customOffDays: [customschema],
});

const LeaveModel = mongoose.model("Leave", leavesSchema);

module.exports = {
  LeaveModel,
};
