const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT_I = 10;
const productOwner = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 100,
  },
  token: {
    type: String,
  },
});

productOwner.pre("save", function (next) {
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

productOwner.methods.comparePasswords = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

productOwner.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET_ID);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

productOwner.statics.findByToken = function (token, cb) {
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

productOwner.methods.deleteToken = function (token, cb) {
  var user = this;
  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const ProductOwner = mongoose.model("ProductOwner", productOwner);

module.exports = {
  ProductOwner,
};
