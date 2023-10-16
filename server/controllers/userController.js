const { UserModel } = require("../models");

const loginUser = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
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

const authUser = (req, res) => {
  res.json({
    auth: true,
    userData: req.user,
  });
};

const logOutUser = (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("goodbye");
  });
};

const updateProfile = (req, res) => {
  UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    { new: true },
    function (err, doc) {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        userData: doc,
      });
    }
  );
};

const get_manager_data = async (req, res) => {
  try {
    UserModel.findOne({ email: req.query.email }, (err, data) => {
      if (err) return res.status(400).send(err);
      const { reportingManager, seniorReportingManager } = data;

      res.status(200).json({
        success: true,
        managers: {
          reportingManager,
          seniorReportingManager,
        },
      });
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  loginUser,
  updateProfile,
  authUser,
  logOutUser,
  get_manager_data,
};
