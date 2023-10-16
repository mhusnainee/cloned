const { UserModel, ProductOwner } = require("../models");

let auth = (req, res, next) => {
  let token = req.headers.authorization;

  UserModel.findByToken(token, (err, user) => {
    if (err)
      return res.send({
        status: false,
        err: "invalid webtoken",
      });
    if (!user)
      return res.send({
        status: false,
        err: "No user found",
      });
    req.token = token;
    req.user = user;
    next();
  });
};

let su_auth = (req, res, next) => {
  let token = req.headers.authorization;
  ProductOwner.findByToken(token, (err, user) => {
    if (err)
      return res.send({
        status: false,
        err: "invalid webtoken",
      });
    if (!user)
      return res.send({
        status: false,
        err: "No user found, login first",
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = {
  auth,
  su_auth,
};
