const express = require("express");
const router = express.Router();

// import controllers
const {
  registerStudent,
  studentLogin,
  staffLogin,
  adminLogin,
  forgotpassword,
  resetpassword,
  registerStaff,
  registerAdmin,
  
} = require("../controllers/authenticationController");
 
//register Routes

router.route("/registerstudent").post(registerStudent);
router.route("/registerstaff").post(registerStaff);
router.route("/registeradmin").post(registerAdmin);

//login routes
router.route("/studentlogin").post(studentLogin);
router.route("/stafflogin").post(staffLogin);
router.route("/adminlogin").post(adminLogin);


//router.route("/forgotpassword").post(forgotpassword);

//router.route("/resetpassword/:resetToken").post(resetpassword);

module.exports = router;