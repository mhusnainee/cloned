const { UserModel } = require("./UserModel");
const { LeaveModel } = require("./LeaveModel");
const { SuperUser } = require("./ProductOwnerModel");
const { DepModel } = require("./DepartmentModel");

module.exports = {
  SuperUser,
  LeaveModel,
  UserModel,
  DepModel,
};
