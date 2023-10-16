const express = require("express");
const router = express.Router();
const { su_auth } = require("../middleware/authMiddleware");
const {
  registerSuperUser,
  loginSuperUser,
  superUserAuth,
  logOutSuperUser,
  registerNewCompany,
} = require("../controllers/POController");

router.post("/register", registerSuperUser);
router.post("/login", loginSuperUser);
router.get("/auth", su_auth, superUserAuth);
router.get("/logout", su_auth, logOutSuperUser);

// register New Company

router.post("/regcompany", registerNewCompany);

module.exports = router;
