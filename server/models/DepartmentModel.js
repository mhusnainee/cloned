const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const departments = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyID: {
    required: true,
    type: String,
  },
  departments: [],
});

const DepModel = mongoose.model("Departments", departments);

module.exports = {
  DepModel,
};
