const router = require ('express').Router()

// import  protected-routes middlewares
//const {protectedStudent,protectedStudentAndStaff} = require("../middlewares/authMiddlewares");


//import controllers
const {
    uploadFile,
    getAllstudentUploads,
    deletestudentUploads
    


    // getInvoice
} = require("../controllers/studentUploadController");

//Students Group routes

router.route("/add").post(uploadFile);
router.route("/").get(getAllstudentUploads);
router.route("/delete/:id").delete(deletestudentUploads);

module.exports = router; 