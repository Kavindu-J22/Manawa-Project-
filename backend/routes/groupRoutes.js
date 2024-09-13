const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
//const {protectedStudent,protectedStudentAndStaff} = require("../middlewares/authMiddlewares");


//import controllers
const {
    addGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    getGroup,


    // getInvoice
} = require("../controllers/groupController");

//Students Group routes

router.route("/addGroup").post(addGroup);
router.route("/update/:id").put(updateGroup);
router.route("/delete/:id").delete(deleteGroup);
router.route("/").get(getAllGroups);
router.route("/get/:id").get(getGroup);

module.exports = router; 