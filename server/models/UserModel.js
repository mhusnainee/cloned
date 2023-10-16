const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT_I = 10;

const docSchema = {
  documentName: {
    type: String,
  },
  note: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  images: [],
  followers: [],

  assignee: {
    type: String,
  },
  assigner: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  submitted: {
    type: Boolean,
  },
};

const userSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    required: true,
  },

  empID: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },

  presentAddress: {
    type: String,
  },

  permanentAddress: {
    type: String,
  },

  firstName: {
    type: String,
    maxlength: 100,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },

  middleName: {
    type: String,
    maxlength: 100,
  },

  role: {
    required: true,
    type: String,
  },

  profilePicture: {
    type: String,
  },

  token: {
    type: String,
  },

  documents: [docSchema],

  hrLetters: { type: [] },

  permissions: [],

  phoneNumber: {
    type: String,
  },

  gmailAddress: {
    type: String,
  },

  otherEmailAddress: {
    type: String,
  },

  jobType: {
    type: String,
  },

  department: {
    type: String,
  },

  status: {
    type: String,
  },

  designation: {
    type: String,
  },

  cnicNumber: {
    type: String,
  },

  doj: {
    type: String,
  },

  dob: {
    type: String,
  },

  LinkedInProfile: {
    type: String,
  },

  reportingManager: {
    type: [],
  },

  seniorReportingManager: {
    type: [],
  },

  companyID: {
    required: true,
    type: String,
  },
  archived: {
    type: Boolean,
  },
  nok: {
    type: {},
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePasswords = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET_ID);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, process.env.SECRET_ID, function (err, decode) {
    if (err) return cb(err);
    user.findOne(
      {
        _id: decode,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

userSchema.methods.deleteToken = function (token, cb) {
  var user = this;
  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
