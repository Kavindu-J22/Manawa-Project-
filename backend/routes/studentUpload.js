
const router = require ('express').Router()
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const upload = require ('../utils/multer');
const StudentUpload = require('../models/StudentUpload')



router.post("/add", upload.single("image"), async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new user
      let studentUpload = new StudentUpload({
        groupId: req.body.groupId,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save user
      await studentUpload.save();
      res.json(studentUpload);
    } catch (err) {
      console.log(err);
    }
  });



//get all groups
router.route("/").get((req,res) => {
     
    StudentUpload.find().then((studentUpload) => {
        res.json(studentUpload)

    }).catch((err) => {
        console.log("Error occurred in get All files" + err);
    })


})



//delete Student upload
router.delete("/:id", async(req, res) => {
    try{
        //Find user by id
        let studentUpload = await StudentUpload.findById(req.params.id);
        //delete file from db
        await studentUpload.remove();
        res.status(200).send({status: "Group deleted"});
    }catch(err){

        console.log("Error occurred in Delete file" + err);

    }
})



router.put("/update/:id", upload.single("image"), async (req,res) => {
    try{
        let studentUpload = await StudentUpload.findById(req.params.id);
        await cloudinary.uploader.destroy(studentUpload.cloudinary_id);

        const result = await cloudinary.uploader.upload(req.file.path);

        const data = {

            groupId: req.body.groupId || studentUpload.groupId,
            avatar: result.secure_url || studentUpload.avatar,
            cloudinary_id: result.public_id || studentUpload.cloudinary_id,

        };
        studentUpload = await StudentUpload.findByIdAndUpdate(req.params.id, data, { new:true});
        res.json(studentUpload); 
    } catch (err){
        console.log("Error occurred in Update file" + err);
    }

})



//download file

router.get('/download/:id', async (req, res) => {
    try {
       const file = await StudentUpload.findById(req.params.id);
       res.set({
          'Content-Type': file.file_mimetype,
       });
       res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
       res.status(400).send('Error while downloading file. Try again later.');
    }
 });

module.exports = router;