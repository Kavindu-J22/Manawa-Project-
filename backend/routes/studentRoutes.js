const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedStudent,protectedStudentAndStaff} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getStudentProfile,
    updateStudentProfile,
    deleteStudentProfile,
    allProfiles,

    // getInvoice
} = require("../controllers/studentController");

//student profile routes

router.route("/profile").get(protectedStudent,getStudentProfile);
router.route("/updateProfile").put(protectedStudent,updateStudentProfile);
router.route("/deleteProfile").delete(protectedStudent,deleteStudentProfile);
router.route("/allProfiles").get(allProfiles);

module.exports = router; 