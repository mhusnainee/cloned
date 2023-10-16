const { ProductOwner } = require("../models/ProductOwnerModel");
const { UserModel } = require("../models/UserModel");
const { ObjectId } = require("mongodb");
const { assignLeaveTemplate } = require("./leaveControllers");
const { LeaveModel } = require("../models");

const registerSuperUser = (req, res) => {
  ProductOwner.findOne({ email: req.body.email }, (err, doc) => {
    if (doc) return res.json({ message: "User already exist" });
    if (err) return res.json({ success: false });
    const user = new ProductOwner(req.body);
    user.save((err, doc) => {
      if (err) return res.json({ success: false });
      res.status(200).json({
        success: true,
        userData: doc,
      });
    });
  });
};

const loginSuperUser = (req, res) => {
  ProductOwner.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        auth: false,
        message: "Auth failes, email not found",
        userData: false,
      });
    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          auth: false,
          message: "Wrong password",
          userData: false,
        });
      user.generateToken((err, user) => {
        if (err) return res.json(400).send(err);
        res.cookie("auth", user.token).json({
          auth: true,
          userData: user,
        });
      });
    });
  });
};

const superUserAuth = (req, res) => {
  res.json({
    auth: true,
    userData: req.user,
  });
};

// logout super user
const logOutSuperUser = (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("goodbye");
  });
};
const registerNewCompany = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email: req.body.email }, { companyName: req.body.companyName }],
    }).exec();

    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res.json({
          message: "Email already exists, try using another email ID",
        });
      }
      if (existingUser.companyName === req.body.companyName) {
        return res.json({ message: "Company name already registered" });
      }
    }

    const newUserID = new ObjectId();
    console.log(newUserID);
    const userModel = new UserModel(req.body);
    userModel._id = newUserID;
    userModel.companyID = newUserID;
    const savedUser = await userModel.save();

    const leavemodel = new LeaveModel({
      companyName: savedUser.companyName.toString(),
      companyID: savedUser.companyID.toString(),
      leaveTypes: [],
      weekDays: [1, 2, 3, 4, 5, 6],
      halfDays: [6],
      customOffDays: [],
    });
    let result = await leavemodel.save();

    console.log(result);

    res.status(200).json({ success: true, data: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

module.exports = {
  registerSuperUser,
  loginSuperUser,
  superUserAuth,
  logOutSuperUser,
  registerNewCompany,
};
