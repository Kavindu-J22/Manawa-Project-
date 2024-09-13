const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedStaff,protectedStaffAndStaff} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getStaffProfile,
    updateStaffProfile,
    deleteStaffProfile,
    allProfiles,

    // getInvoice
} = require("../controllers/staffController");

//Staff profile routes

router.route("/profile").get(protectedStaff,getStaffProfile);
router.route("/updateProfile").put(protectedStaff,updateStaffProfile);
router.route("/deleteProfile").delete(protectedStaff,deleteStaffProfile);
router.route("/allprofiles").get(allProfiles);

module.exports = router; 