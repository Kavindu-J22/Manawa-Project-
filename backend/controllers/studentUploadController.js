const router = require ('express').Router()
const cloudinary = require('../utils/cloudinary');
const upload = require ('../utils/multer');
const StudentUpload = require('../models/StudentUpload')


//Add Group details
exports.uploadFile = async (req, res) => {
   // upload.single('image');
    try{
       
        const result = await cloudinary.uploader.upload(req.file.path);
        //create instance of Student uploads
        let studentUpload = new StudentUpload ({
            groupId: req.body.groupId,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });

        //save student upload
        await studentUpload.save();
        res.json(studentUpload);
        
        
    } catch (error) {
        res.status(500).json({
          error,
          desc: "Error occurred in File Upload" + error,
        });
      }
    
  };




  //Get All Student Uploads
exports.getAllstudentUploads = async (req,res) =>{
    
    try{
      let studentUpload = await StudentUpload.find();
      res.json(studentUpload);
  
    
        }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in get All Student Upload controller - "+error,
        });
    }
};




 //Delete Student Upload
 exports.deletestudentUploads = async (req,res) =>{
    
  try{
    //Find user by id
    let studentUpload = await StudentUpload.findById(req.params.id);
    //delete file from db
    await studentUpload.remove();
    res.status(200).send({status: "Group deleted"});
    res.json(studentUpload);

}catch(err){

    console.log("Error occurred in Delete file" + err);

}
};




